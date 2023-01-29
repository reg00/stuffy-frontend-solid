import {
  Button,
  notificationService,
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
import { Component, createResource, createSignal, For } from 'solid-js'
import api from '../../../api/api'
import {
  UpsertParticipantEntry,
  UserEntry,
} from '../../../api/__generated__/stuffyHelperApi'
import PlusIcon from '../../icons/PlusIcon'

type Props = {
  eventId
  refetch?: () => void
}
const AddParticipant: Component<Props> = ({ eventId, refetch }) => {
  const fetcher = () => api.authUsersList().then((res) => res.data)
  const [users] = createResource<UserEntry[]>(fetcher, { initialValue: [] })

  const [userId, setUserId] = createSignal('')

  const [loading, setLoading] = createSignal(false)

  const post = async (payload) => {
    setLoading(true)
    try {
      await api.participantsCreate(payload)

      notificationService.show({
        status: 'success',
        title: 'Участник успешно добавлен',
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

    const payload: UpsertParticipantEntry = {
      eventId,
      userId: userId(),
    }

    post(payload)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h5>Добавить участника</h5>
      <Select id="userId" value={userId()} onChange={setUserId}>
        <SelectTrigger>
          <SelectPlaceholder>выберите единицу измерения</SelectPlaceholder>
          <SelectValue />
          <SelectIcon />
        </SelectTrigger>
        <SelectContent>
          <SelectListbox>
            <For each={users()}>
              {(user) => (
                <SelectOption value={user.id}>
                  <SelectOptionText>{user.name}</SelectOptionText>
                  <SelectOptionIndicator />
                </SelectOption>
              )}
            </For>
          </SelectListbox>
        </SelectContent>
      </Select>
      <Button type="submit" class="mt-2" rightIcon={<PlusIcon />}>
        Добавить
      </Button>
    </form>
  )
}

export default AddParticipant
