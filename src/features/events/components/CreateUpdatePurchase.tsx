import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  SelectContent,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectOptionIndicator,
  SelectOptionText,
  SelectPlaceholder,
  SelectTrigger,
  SelectValue,
} from '@hope-ui/solid'
import {
  Component,
  createEffect,
  createResource,
  createSignal,
  For,
  Resource,
} from 'solid-js'
import api from '../../../api/api'
import {
  AddPurchaseEntry,
  ParticipantShortEntry,
  UnitTypeShortEntry,
} from '../../../api/__generated__/stuffyHelperApi'
import { useAuthContext } from '../../auth/useAuth'
import PlusIcon from '../../icons/PlusIcon'

type Props = {
  eventId: string
  participants: Resource<ParticipantShortEntry[]>
  refetch: () => void
}
const CreateUpdatePurchase: Component<Props> = ({
  eventId,
  participants,
  refetch,
}) => {
  const [{ user }] = useAuthContext()

  const [loading, setLoading] = createSignal(false)

  const [unitType, setUnitType] = createSignal('')
  const defaultParticipant =
    participants().find((par) => par.name === user().name)?.id ?? ''

  console.log('deafultParticipant', defaultParticipant)
  const [participantId, setParticipantId] = createSignal(defaultParticipant)
  // заполнение participantId "собой"

  const fetcher = () => api.unitTypesList().then((res) => res.data.data)
  const [unitTypes] = createResource<UnitTypeShortEntry[]>(fetcher, {
    initialValue: [],
  })
  // заполнение unitType первым элементом
  createEffect(() => {
    if (unitType()) return
    if (unitTypes().length === 1) {
      setUnitType(unitTypes()[0].id)
    }
  })

  const createPurchase = async (payload: AddPurchaseEntry) => {
    setLoading(true)

    try {
      await api.purchasesCreate(payload)

      if (refetch) {
        refetch()
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    debugger
    const name = e.target.name.value
    const cost = e.target.cost.value
    const amount = e.target.amount.value
    const eventId = e.target.eventId.value
    const _participantId = participantId()
    const unitTypeId = unitType()

    const payload: AddPurchaseEntry = {
      name,
      cost,
      amount,
      eventId,
      participantId: _participantId,
      unitTypeId,
    }

    createPurchase(payload)
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl required>
        <FormLabel for="name">Название</FormLabel>
        <Input id="name" />
      </FormControl>
      <FormControl required>
        <FormLabel for="participantId">participantId</FormLabel>
        <Select
          id="participantId"
          value={participantId()}
          onChange={setParticipantId}
        >
          <SelectTrigger>
            <SelectPlaceholder>выберите единицу измерения</SelectPlaceholder>
            <SelectValue />
            <SelectIcon />
          </SelectTrigger>
          <SelectContent>
            <SelectListbox>
              <For each={participants()}>
                {(participant) => (
                  <SelectOption value={participant.id}>
                    <SelectOptionText>
                      {participant?.name ?? participantId}
                    </SelectOptionText>
                    <SelectOptionIndicator />
                  </SelectOption>
                )}
              </For>
            </SelectListbox>
          </SelectContent>
        </Select>
      </FormControl>
      <FormControl required>
        <FormLabel for="participantId">Кто потратился</FormLabel>
        <Input id="participantId" disabled value={user().id} />
      </FormControl>
      <FormControl required>
        <FormLabel for="eventId">eventId</FormLabel>
        <Input id="eventId" disabled value={eventId} />
      </FormControl>
      <FormControl required>
        <FormLabel for="amount">Количество</FormLabel>
        <Input id="amount" />
      </FormControl>
      <FormControl required>
        <FormLabel for="cost">Цена за штуку</FormLabel>
        <Input id="cost" />
      </FormControl>
      <FormControl required>
        <FormLabel for="unitTypeId">UnitTypeId</FormLabel>
        <Select id="unitTypeId" value={unitType()} onChange={setUnitType}>
          <SelectTrigger>
            <SelectPlaceholder>выберите единицу измерения</SelectPlaceholder>
            <SelectValue />
            <SelectIcon />
          </SelectTrigger>
          <SelectContent>
            <SelectListbox>
              <For each={unitTypes()}>
                {(unitType) => (
                  <SelectOption value={unitType.id}>
                    <SelectOptionText>{unitType.name}</SelectOptionText>
                    <SelectOptionIndicator />
                  </SelectOption>
                )}
              </For>
            </SelectListbox>
          </SelectContent>
        </Select>
      </FormControl>
      <Button class="mt-2" type="submit" rightIcon={<PlusIcon />}>
        Создать
      </Button>
    </form>
  )
}

export default CreateUpdatePurchase
