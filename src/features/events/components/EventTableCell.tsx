import { Checkbox, Input, notificationService } from '@hope-ui/solid'
import { CellContext } from '@tanstack/solid-table'
import { Component, createSignal, Match, Switch } from 'solid-js'
import { NormalizedPurchase } from './EventTable'

const EventTableCell: Component<CellContext<NormalizedPurchase, number>> = ({
  row,
  getValue,
  table,
  column: { id: columnId },
}) => {
  const initialValue = getValue()
  const isPartial = () => row.original.isPartial
  const [value, setValue] = createSignal<number>(initialValue)

  let controller: AbortController | null

  const patchServer = table.options.meta.patchServer
  const updatePurchaseUsage = table.options.meta.updatePurchaseUsage

  const setValueWithEffect = async (_value: number): Promise<void> => {
    const oldValue = value()

    setValue(_value)
    updatePurchaseUsage(row.original.id, columnId, _value)

    if (controller) {
      controller.abort()
    }

    controller = new AbortController()

    if (oldValue === _value) return

    try {
      await patchServer(row.original.id, columnId, _value, controller)
    } catch (error) {
      // при ошибке ставим старое значение клетки
      updatePurchaseUsage(
        row.original.id,
        columnId,
        oldValue,
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

    if (isNumeric(val) && Number.isInteger(Number(val)) && Number(val) > 0) {
      setValueWithEffect(Number(val))
      return
    }

    setValueWithEffect(0)
  }

  return (
    <Switch>
      <Match when={!isPartial()}>
        <Checkbox checked={booleanValue()} onChange={handleBooleanChange} />
      </Match>
      <Match when={isPartial()}>
        <Input type="number" value={value()} onBlur={handleBlur} />
      </Match>
    </Switch>
  )
}

export default EventTableCell
