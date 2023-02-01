import {
  flexRender,
  getCoreRowModel,
  ColumnDef,
  createSolidTable,
  createColumnHelper,
  RowData,
} from '@tanstack/solid-table'
import {
  Component,
  createResource,
  createSignal,
  For,
  Match,
  Resource,
  Switch,
} from 'solid-js'

import './EventTable.css'

import {
  GetPurchaseEntry,
  ParticipantShortEntry,
  UpsertPurchaseUsageEntry,
} from '../../../api/__generated__/stuffyHelperApi'
import { Checkbox, Input, notificationService } from '@hope-ui/solid'
import { createStore } from 'solid-js/store'
import api from '../../../api/api'

createColumnHelper()

declare module '@tanstack/solid-table' {
  interface TableMeta<TData extends RowData> {
    updatePurchaseUsage: (
      rowId: string,
      columnId: string,
      value: number
    ) => void
  }
}

type P = {
  eventId: string
  participants: Resource<ParticipantShortEntry[]>
  purchases: Resource<GetPurchaseEntry[]>
}

type NormParticipant = GetPurchaseEntry & {
  // здесь храним number
  cellValues: Record<string, number>
}
const EventTable: Component<P> = ({ eventId, participants, purchases }) => {
  const normalizedParticipants = () =>
    purchases().map((purchase) => {
      const cellValues = participants()
        .map((participant) => {
          const purchaseUsage = purchase.purchaseUsages.find(
            (usage) => usage.participantId === participant.id
          )

          return {
            participantId: participant.id,
            value: purchaseUsage?.amount ?? 0,
          }
        })
        .reduce((acc, current) => {
          acc[current.participantId] = current.value
          return acc
        }, {} as Record<string, number>)

      return { ...purchase, cellValues }
    })

  type S = { rows: NormParticipant[] }
  const [state, setState] = createStore<S>({
    rows: normalizedParticipants(),
  })

  const fetcher = () =>
    api.purchaseUsagesList({ eventId }).then(({ data }) => data.data)
  const [purchaseUsages, { refetch: refetchPurchaseUsages }] = createResource(
    fetcher,
    { initialValue: [] }
  )

  const patchServer = async (
    rowId: string,
    columnId: string,
    value: number,
    abortController: AbortController
  ) => {
    // OPTIMISTIC UI STUFF
    // const purchaseUsage = purchases()
    //   .find((purchase) => purchase.id === rowId)
    //   ?.purchaseUsages.find((usage) => usage.participantId === columnId)
    const purchaseUsage = purchaseUsages().find(
      (usage) => usage.participant.id === columnId
    )

    try {
      if (purchaseUsage) {
        if (value == 0) {
          await api.purchaseUsagesDelete(purchaseUsage.id, {
            signal: abortController.signal,
          })

          notificationService.show({
            title: 'Клетка удалена успешно',
            status: 'success',
          })
          refetchPurchaseUsages()

          return
        } else {
          const payload: UpsertPurchaseUsageEntry = {
            purchaseId: rowId,
            participantId: columnId,
            amount: value,
          }
          await api.purchaseUsagesPartialUpdate(purchaseUsage.id, payload, {
            signal: abortController.signal,
          })

          notificationService.show({
            title: 'Клетка обновлена успешно',
            status: 'success',
          })

          return
        }
      }

      if (value === 0) return

      const payload: UpsertPurchaseUsageEntry = {
        purchaseId: rowId,
        participantId: columnId,
        amount: value,
      }
      await api.purchaseUsagesCreate(payload, {
        signal: abortController.signal,
      })
      notificationService.show({
        title: 'Клетка создана успешно',
        status: 'success',
      })
      refetchPurchaseUsages()
      return
    } catch (error) {
      // применяем oldValue при ошибке
      // setState('rows', (row) => row.id === rowId, 'cellValues', columnId, value)
    }
  }

  const updatePurchaseUsage = async (
    rowId: string,
    columnId: string,
    value: number
  ) => {
    setState('rows', (row) => row.id === rowId, 'cellValues', columnId, value)
  }

  const columnHelper = createColumnHelper<NormParticipant>()

  const columns = () => {
    const last = participants().map((participant) => {
      const column = columnHelper.accessor(
        (row) => row.cellValues[participant.id],
        {
          id: String(participant.id),
          header: participant.name,
          cell: ({ getValue, row, column: { id }, table }) => {
            const initialValue = getValue()
            const isPartial = row.original.isPartial
            const [value, setValue] = createSignal<number>(initialValue)

            let controller: AbortController | null

            const setValueWithEffect = async (
              _value: number
            ): Promise<void> => {
              const oldValue = value()
              setValue(_value)
              table.options.meta?.updatePurchaseUsage(
                row.original.id,
                id,
                _value
              )

              if (controller) {
                controller.abort()
              }

              controller = new AbortController()

              if (oldValue === _value) return

              try {
                await patchServer(row.original.id, id, _value, controller)
              } catch (error) {
                // при ошибке ставим старое значение клетки
                table.options.meta?.updatePurchaseUsage(
                  row.original.id,
                  id,
                  oldValue
                )

                notificationService.show({
                  title: 'При изменении клетки произошла ошибка',
                  status: 'danger',
                })
              }
            }

            const booleanValue = () => !!value()
            const handleBooleanChange = (e) => {
              const val = e.target.checked as boolean
              setValueWithEffect(Number(val))
            }

            function isNumeric(n) {
              return !isNaN(parseFloat(n)) && isFinite(n)
            }

            const handleBlur = (e) => {
              const val = e.target.value as string

              if (
                isNumeric(val) &&
                Number.isInteger(Number(val)) &&
                Number(val) > 0
              ) {
                setValueWithEffect(Number(val))
                return
              }

              setValueWithEffect(0)
            }

            return (
              <Switch>
                <Match when={!isPartial}>
                  <Checkbox
                    checked={booleanValue()}
                    onChange={handleBooleanChange}
                  />
                </Match>
                <Match when={isPartial}>
                  <Input
                    type="number"
                    value={value()}
                    onBlur={handleBlur}
                    // onInput={handleNumberChange}
                  />
                  {/* <Checkbox checked={booleanValue()} onChange={handleBooleanChange} /> */}
                </Match>
              </Switch>
            )

            return
          },
        }
      )

      return column
    })

    return [
      {
        id: 'трата',
        header: 'Траты',
        accessorFn: (row) => row.name,
      },
      ...last,
    ]
  }

  const table = createSolidTable({
    get data() {
      return state.rows
    },
    columns: columns(),
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updatePurchaseUsage,
    },
  })

  return (
    <div class="p-2">
      <table>
        <thead>
          <For each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <tr>
                <For each={headerGroup.headers}>
                  {(header) => (
                    <th>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  )}
                </For>
              </tr>
            )}
          </For>
        </thead>
        <tbody>
          <For each={table.getRowModel().rows}>
            {(row) => (
              <tr>
                <For each={row.getVisibleCells()}>
                  {(cell) => (
                    <td>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  )
}

export default EventTable
