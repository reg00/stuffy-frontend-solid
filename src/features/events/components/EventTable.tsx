import {
  flexRender,
  getCoreRowModel,
  createSolidTable,
  createColumnHelper,
  RowData,
} from '@tanstack/solid-table'
import { Component, For } from 'solid-js'
import './EventTable.css'

import {
  GetPurchaseEntry,
  UpdatePurchaseEntry,
} from '../../../api/__generated__/stuffyHelperApi'

import EventTableCell from './EventTableCell'
import EventTableCellFirst from './EventTableCellFirst'
import useTableState from '../hooks/useTableState'

declare module '@tanstack/solid-table' {
  interface TableMeta<TData extends RowData> {
    updatePurchaseUsage: (
      rowId: string,
      columnId: string,
      value: number
    ) => Promise<void>
    updatePurchase: (
      purchaseId: string,
      payload: UpdatePurchaseEntry
    ) => Promise<void>
    patchServer: (
      rowId: string,
      columnId: string,
      value: number,
      abortController: AbortController
    ) => Promise<void>
  }
}

type P = {
  eventId: string
}

export type NormalizedPurchase = GetPurchaseEntry & {
  cellValues: Record<string, number>
}

const EventTable: Component<P> = ({ eventId }) => {
  const columnHelper = createColumnHelper<NormalizedPurchase>()

  const firstColumn = columnHelper.accessor((row) => row.name, {
    id: 'Траты',
    header: 'Траты',
    cell: EventTableCellFirst,
  })

  const columns = () => {
    const last = participants().map((participant) => {
      const column = columnHelper.accessor(
        (row) => row.cellValues[participant.id],
        {
          id: String(participant.id),
          header: participant.name,
          cell: EventTableCell,
        }
      )

      return column
    })

    return [firstColumn, ...last]
  }

  const {
    normalizedPurchases,
    participants,
    patchServer,
    updatePurchaseUsage,
    updatePurchase,
  } = useTableState({
    eventId,
  })

  const table = createSolidTable({
    get data() {
      return normalizedPurchases()
    },
    get columns() {
      return columns()
    },
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updatePurchaseUsage,
      updatePurchase,
      patchServer,
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
