import {
  flexRender,
  getCoreRowModel,
  ColumnDef,
  createSolidTable,
  createColumnHelper,
  RowData,
  StringOrTemplateHeader,
} from '@tanstack/solid-table'
import {
  Component,
  createMemo,
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
  PurchaseShortEntry,
  PurchaseUsageShortEntry,
  UpdatePurchaseEntry,
  UpsertPurchaseUsageEntry,
} from '../../../api/__generated__/stuffyHelperApi'
import { Checkbox, dividerStyles, Input, notificationService } from '@hope-ui/solid'
// import { createStore } from 'solid-js/store'
import api from '../../../api/api'
import AddParticipant from './AddParticipant'
import { produce } from 'solid-js/store'

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
            (usage) => usage.participantId === participant.id && usage.purchaseId === purchase.id
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
  const [state, setState] = createSignal<S>({
    rows: normalizedParticipants(),
  })

  const memoedRows = createMemo(() => state().rows)

  const changePurchase = (purchaseId: string, value: boolean): void => {
    setState(produce(oldState => {
      const oldPurchase =  oldState.rows.find(row => row.id === purchaseId)
      if(!oldPurchase) return

      oldPurchase.isPartial = value
    }))

    // setState('rows', produce())
  }

  const fetcher = () =>
    api.purchaseUsagesList({ eventId }).then(({ data }) => data.data)
  const [purchaseUsages, { mutate: mutatePurchaseUsages }] = createResource(
    fetcher,
    { initialValue: [] }
  )

  const addOrUpdatePurchaseUsage = (payload: PurchaseUsageShortEntry): void => {
    mutatePurchaseUsages((oldUsages) => {
      const old = oldUsages.find(usage => usage.purchaseUsageId === payload.purchaseUsageId)

      if(!old) {
        return [...oldUsages, payload]
      }

      //update
      return oldUsages.map((oldUsage) => {
        if (payload.purchaseUsageId !== oldUsage.purchaseUsageId)
        return {...oldUsage}

        return { ...payload }
      })
    })
  }

  const deletePurchaseUsage = (purchaseUsageId): void => {
    mutatePurchaseUsages((oldUsages) =>
      oldUsages.filter((usage) => usage.purchaseUsageId !== purchaseUsageId)
    )
  }

  const patchServer = async (
    rowId: string,
    columnId: string,
    value: number,
    abortController: AbortController
  ) => {
    // OPTIMISTIC UI STUFF
    const purchaseUsage = purchaseUsages().find(
      (usage) => usage.participantId === columnId && usage.purchaseId === rowId
    )

    try {
      if (purchaseUsage) {
        if (value == 0) {
          await api.purchaseUsagesDelete(purchaseUsage.purchaseUsageId, {
            signal: abortController.signal,
          })

          notificationService.show({
            title: 'Клетка удалена успешно',
            status: 'success',
          })

          deletePurchaseUsage(purchaseUsage.purchaseUsageId)

          // refetchPurchaseUsages()

          return
        } else {
          const payload: UpsertPurchaseUsageEntry = {
            purchaseId: rowId,
            participantId: columnId,
            amount: value,
          }

          const { data: newUsage } = await api.purchaseUsagesPartialUpdate(
            purchaseUsage.purchaseUsageId,
            payload,
            {
              signal: abortController.signal,
            }
          )

          notificationService.show({
            title: 'Клетка обновлена успешно',
            status: 'success',
          })

          addOrUpdatePurchaseUsage(newUsage)

          return
        }
      }

      if (value === 0) return

      const payload: UpsertPurchaseUsageEntry = {
        purchaseId: rowId,
        participantId: columnId,
        amount: value,
      }

      const { data: newUsage } = await api.purchaseUsagesCreate(payload, {
        signal: abortController.signal,
      })
      notificationService.show({
        title: 'Клетка создана успешно',
        status: 'success',
      })

      addOrUpdatePurchaseUsage(newUsage)
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
    // setState('rows', (row) => row.id === rowId, 'cellValues', columnId, value)
    // setState(produce(oldState => oldState.rows )) }

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
            const isPartial = () => row.original.isPartial
            // const isPartial = row.original.isPartial
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
              <div>
                <p>

user: {id.slice(0, 4)}
purchase: {row.original.id.slice(0,4)}


{/* {

    JSON.stringify(purchaseUsages().find( (usage) => usage.participantId === id))
} */}
                </p>
                <Switch>
                  <Match when={!isPartial()}>
                    <Checkbox
                      checked={booleanValue()}
                      onChange={handleBooleanChange}
                    />
                  </Match>
                  <Match when={isPartial()}>
                    <Input type="number" value={value()} onBlur={handleBlur} />
                  </Match>
                </Switch>
              </div>
            )
          },
        }
      )

      return column
    })

    const firstColumn = columnHelper.accessor((row) => row.name, {
      id: 'Траты',
      header: 'Траты',
      cell: ({ getValue, row, column: { id }, table }) => {
        // const initialValue = getValue()
        // const isPartial = row.original.isPartial
        // const [value, setValue] = createSignal<number>(initialValue)

        // const [localRow, setLocalRow] = createSignal(row)
        const [isPartial, setIsPartial] = createSignal(!!row.original.isPartial)

        const isValid = () => {
          if(!isPartial()) return true

          const max = row.original.amount 
          const sum = row.getAllCells().map(cell => cell.getValue()).filter(Number.isInteger).reduce((sum: number, cell: number) => cell + sum, 0)
          // const sum = localRow().getAllCells()
          return sum <= max
        }

        const numbers = () => {
          return row.getAllCells().map(cell => cell.getValue()).filter(Number.isInteger)
        }

        let controller: AbortController | null

        // const setValueWithEffect = async (_value: number): Promise<void> => {
        //   const oldValue = value()
        //   setValue(_value)
        //   table.options.meta?.updatePurchaseUsage(row.original.id, id, _value)

        //   if (controller) {
        //     controller.abort()
        //   }

        //   controller = new AbortController()

        //   if (oldValue === _value) return

        //   try {
        //     await patchServer(row.original.id, id, _value, controller)
        //   } catch (error) {
        //     // при ошибке ставим старое значение клетки
        //     table.options.meta?.updatePurchaseUsage(
        //       row.original.id,
        //       id,
        //       oldValue
        //     )

        //     notificationService.show({
        //       title: 'При изменении клетки произошла ошибка',
        //       status: 'danger',
        //     })
        //   }
        // }
        const updatePurchase = async (
          payload: GetPurchaseEntry,
          val: boolean
        ): Promise<void> => {
          const updatePurchaseEntry: UpdatePurchaseEntry = {
            ...payload,
            unitTypeId: payload.unitType.id,
            isPartial: val,
          }

          changePurchase(payload.id, val)

          api.purchasesPartialUpdate(payload.id, updatePurchaseEntry)
        }

        const handleChange = async (e): Promise<void> => {
          const entry = row.original

          setIsPartial(e.target.checked)
          updatePurchase(entry, e.target.checked)
        }

        return (
          <div class="row-kek">
            <p>
              {numbers().join(', ')}
            </p>
            <p>
            {row.original.name}
            </p>
            <p>
              max: {row.original.amount}
            </p>
            <p>
              isValid: {isValid() ? 'ok' : 'notok'}
            </p>
            <Checkbox checked={isPartial()} onChange={handleChange} />
          </div>
        )
      },
    })

    // const first = {
    //     id: 'трата',
    //     header: 'Траты',
    //     accessorFn: (row) => row.name,
    // }

    return [
      firstColumn,
      // {
      // },
      ...last,
    ]
  }

  // const computedRows = () => state.rows

  const table = createSolidTable({
    data: state().rows,
    // get data() {
    //   return computedRows()
    // },
    columns: columns(),
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updatePurchaseUsage,
    },
    // onStateChange: ()
    // onStateChange: (val) => setState('rows', val)
    // onStateChange: setState
  })




  // table.setOptions(prev => ({
  //   ...prev,
  //   state,
  //   onStateChange: setState
  // }))



  return (
    <div class="p-2">
      {/* {JSON.stringify(state.rows)} */}
      <table>
        <For each={purchaseUsages()}> 
        {
          (usage) => (
            <tr>
              <td class='p-2'>user: {usage.participantId.slice(0,4)}</td>
              <td class='p-2'>purchase: {usage.purchaseId.slice(0,4)}</td>
              <td class='p-2'>purchaseUsage: {usage.purchaseUsageId.slice(0,4)}</td>
              <td class='p-2'>amount: {usage.amount}</td>
            </tr>
          )
        }

        </For>
      </table>
      {/* <table>
        <For each={state().rows}> 
        {
          (row) => (
            <tr>
              <td class='p-2'>user: {JSON.stringify(row.cellValues)}</td>
            </tr>
          )
        }

        </For>
      </table> */}
      {JSON.stringify(state().rows)}
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
