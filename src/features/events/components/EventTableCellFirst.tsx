import { Checkbox, Input } from '@hope-ui/solid'
import { CellContext } from '@tanstack/solid-table'
import { Component, createSignal, Match, Switch } from 'solid-js'
import { NormalizedPurchase } from './EventTable'

const EventTableCellFirst: Component<CellContext<NormalizedPurchase, string>> = ({
  row,
  getValue,
  table,
  column: { id: columnId },
}) => {
  const [isPartial, setIsPartial] = createSignal(!!row.original.isPartial)

  const updatePurchase = table.options.meta.updatePurchase

  const isValid = () => {
    if (!isPartial()) return true

    const max = row.original.amount
    const sum = row
      .getAllCells()
      .map((cell) => cell.getValue())
      .filter(Number.isInteger)
      .reduce((sum: number, cell: number) => cell + sum, 0)
    return sum <= max
  }

  const numbers = () => {
    return row
      .getAllCells()
      .map((cell) => cell.getValue())
      .filter(Number.isInteger)
  }

  let controller: AbortController | null


  const handleChange = async (e): Promise<void> => {
    const entry = row.original

    const payload = {
        ...entry,
        unitTypeId: entry.unitType.id,
        isPartial: e.target.checked
    }

    setIsPartial(e.target.checked)
    updatePurchase(row.original.id, payload)
  }

  return (
    <div class="row-kek">
        {/* <p>{getValue()}</p>
      <p>{numbers().join(', ')}</p> */}
      {row.original.id.slice(0,4 )}
      {/* <p>{row.original.name}</p>
      <p>max: {row.original.amount}</p> */}
      <p>isValid: {isValid() ? 'ok' : 'notok'}</p>
      <Checkbox checked={isPartial()} onChange={handleChange} />
    </div>
  )
}

export default EventTableCellFirst
