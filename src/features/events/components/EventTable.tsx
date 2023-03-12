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
  Resource,
} from 'solid-js'

import './EventTable.css'

import {
  GetPurchaseEntry,
  ParticipantShortEntry,
} from '../../../api/__generated__/stuffyHelperApi'
import { Checkbox, notificationService } from '@hope-ui/solid'
import { createStore } from 'solid-js/store'
import api from '../../../api/api'

createColumnHelper()

declare module '@tanstack/solid-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowId: string, columnId: string, value: boolean) => void
  }
}

type P = {
  participants: Resource<ParticipantShortEntry[]>
  purchases: Resource<GetPurchaseEntry[]>
  eventId: string
}
const EventTable: Component<P> = ({ participants, purchases, eventId }) => {
  const usagesFetcher = async () => {
    return api.purchaseUsagesList({ eventId }).then((res) => res.data.data)
  }
  const usages = createResource(usagesFetcher)

  const kekw = () =>
    purchases().map((purchase) => {
      const cellValues = participants()
        .map((participant) => {
          const check = !!purchase.purchaseUsages.find(
            (usage) => usage.participantId === participant.id
          )

          return {
            participantId: participant.id,
            value: check,
          }
        })
        .reduce((acc, current) => {
          acc[current.participantId] = current.value
          return acc
        }, {} as Record<string, boolean>)

      return { ...purchase, cellValues }
    })

  type DataType = GetPurchaseEntry & { cellValues: Record<string, boolean> }

  const columnHelper = createColumnHelper<DataType>()

  const columns = () => {
    const last = participants().map((participant) => {
      const column = columnHelper.accessor(
        (row) => row.cellValues[participant.id],
        {
          id: String(participant.id),
          header: participant.name,
          cell: ({ getValue, row, column: { id }, table }) => {
            const initialValue = getValue()
            const [value, setValue] = createSignal<boolean>(
              initialValue as boolean
            )

            const handleChange = (e) => {
              const val = e.target.checked
              setValue(val)

              table.options.meta?.updateData(row.original.id, id, value())
            }

            return <Checkbox checked={value()} onChange={handleChange} />
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

  const [{ rows }, setStore] = createStore({ rows: kekw() })

  const patchPurchaseUsages = async (
    purchaseId: string,
    participantId: string,
    value: boolean
  ) => {
    try {
      if (value) {
        api.purchaseUsagesCreate({ purchaseId, participantId })
      } else {
        const { data } = await api.purchaseUsagesList({
          purchaseId,
          participantId,
        })
        await api.purchaseUsagesDelete(data.data[0].purchaseUsageId)

        notificationService.show({
          title: 'Таблица изменена',
          status: 'success',
        })
      }
    } catch (error) {}
  }

  const table = createSolidTable({
    get data() {
      return rows
    },
    columns: columns(),
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowId: string, columnId: string, value: boolean) => {
        setStore('rows', (old) =>
          old.map((row) => {
            if (rowId !== row.id) return row

            const newRow = {
              ...row,
              cellValues: {
                ...row.cellValues,
                [columnId]: value,
              },
            }

            patchPurchaseUsages(rowId, columnId, value)

            return newRow
          })
        )
      },
    },
  })

  return (
    <div class="p-2">
      {/* {JSON.stringify(data())} */}
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
        {/* <tfoot>
          <For each={table.getFooterGroups()}>
            {(footerGroup) => (
              <tr>
                <For each={footerGroup.headers}>
                  {(header) => (
                    <th>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </th>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tfoot> */}
      </table>
    </div>
  )
}

export default EventTable
