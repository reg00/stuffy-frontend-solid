import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from '@hope-ui/solid'
import { Component, createSignal } from 'solid-js'
import api from '../../../api/api'
import { notificationService } from '@hope-ui/solid'

type CreateEventsProps = {
  refetch?: () => void
}

const CreateEvent: Component<CreateEventsProps> = ({ refetch }) => {
  const [loading, setLoading] = createSignal(false)

  const todayValue = new Date().toISOString().split('T')[0]
  console.log("ToDAY", todayValue)

  const createEvent = async (payload) => {
    setLoading(true)

    try {
      await api.eventsCreate(payload)
      notificationService.show({
        status: 'success',
        title: 'Ваш эвент успешно создан!',
      })
      if (refetch) {
        refetch()
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('HANDLE submig')

    const date = e.target.eventDateStart.value

    console.log(e.target.eventDateStart.value)

    const payload = {
      Name: e.target.name.value,
      Description: e.target.description.value,
      EventDateStart: date,
    }

    createEvent(payload)
  }
  return (
    <form onSubmit={handleSubmit}>
      <FormControl required>
        <FormLabel for="name">Название события</FormLabel>
        <Input id="name" />
      </FormControl>
      <FormControl>
        <FormLabel for="eventDateStart">Дата начала события</FormLabel>
        <Input id="eventDateStart" value={todayValue} type="date" />
      </FormControl>
      <FormControl>
        <FormLabel for="description">Описание</FormLabel>
        <Textarea id="description" placeholder="Введите описание" />
      </FormControl>
      <Button type="submit">Создать</Button>
    </form>
  )
}

export default CreateEvent
