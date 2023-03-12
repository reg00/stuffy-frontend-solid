import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Button,
  IconButton,
  notificationService,
  Tooltip,
} from '@hope-ui/solid'
import { useParams } from '@solidjs/router'
import {
  Component,
  createResource,
  createSignal,
  For,
  Resource,
  Show,
} from 'solid-js'
import api from '../api/api'
import {
  GetEventEntry,
  GetPurchaseEntry,
  ParticipantShortEntry,
} from '../api/__generated__/stuffyHelperApi'
import { formatDate } from '../features/dates'
import AddParticipant from '../features/events/components/AddParticipant'
import CreateUpdatePurchase from '../features/events/components/CreateUpdatePurchase'
import EventTable from '../features/events/components/EventTable'
import ChevronIcon from '../features/icons/ChevronIcon'
import DeleteIcon from '../features/icons/DeleteIcon'

import './Event.css'

type EventProps = {
  event: GetEventEntry
  participants: Resource<ParticipantShortEntry[]>
  purchases: Resource<GetPurchaseEntry[]>
  refetch: () => void
  refetchParticipants: () => void
  refetchPurchases: () => void
}
const Event: Component<EventProps> = ({
  event,
  purchases,
  participants,
  refetch,
  refetchParticipants,
  refetchPurchases,
}) => {
  const [showAddParticipant, setShowAddParticipant] = createSignal(false)
  const [showCreate, setShowCreate] = createSignal(false)

  const [loading, setLoading] = createSignal(false)

  const deleteParticipant = async (participantId: string) => {
    setLoading(true)
    try {
      await api.participantsDelete(participantId)
      notificationService.show({
        title: 'Участник удален',
        status: 'success',
      })

      refetchParticipants()
    } finally {
      setLoading(false)
    }
  }

  const deletePurchase = async (purchaseId: string) => {
    try {
      api.purchasesDelete(purchaseId)
      notificationService.show({
        title: 'Трата удалена',
        status: 'success',
      })
    } finally {
    }
  }

  const onCalculate = async () => {
    const response = await api.eventsCheckoutCreate(event.id)
    refetchPurchases()
  }

  return (
    <div class="event__detailed p-2">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Эвенты</BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink currentPage>{event.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <div class="event__photo">
        <img
          src={event.mediaUri}
          alt="КРУТАЯ ФОТКА С УЧАСТНИКАМИ"
          style={`max-width: 300px`}
        />
      </div>
      <h2>{event.name}</h2>
      <div class="event__date">{formatDate(event.eventDateStart)}</div>

      <div class="event__description"></div>

      <div class="event__participants">
        <h3>Участники:</h3>
        <ul class="list-disc">
          <For each={participants()}>
            {(participant) => (
              <li>
                <div class="flex items-center gap-1">
                  {participant.name}{' '}
                  <span class="text-gray-400">
                    {participant.id.slice(0, 4)}
                  </span>
                  <div class="ml-auto">
                    <Tooltip label="Удалить участника">
                      <IconButton
                        variant="ghost"
                        aria-label="Search"
                        onClick={() => deleteParticipant(participant.id)}
                        icon={<DeleteIcon />}
                      />
                    </Tooltip>
                  </div>
                </div>
              </li>
            )}
          </For>
        </ul>
        <Button
          onClick={() => setShowAddParticipant((a) => !a)}
          rightIcon={<ChevronIcon />}
        >
          Добавить участника
        </Button>
        <Show when={showAddParticipant()}>
          <div class="my-4">
            <AddParticipant eventId={event.id} refetch={refetchParticipants} />
          </div>
        </Show>
      </div>
      <div class="event__shopping-list">
        <div class="list__header">
          <h3>траты:</h3>
          <ul class="list-disc">
            <For each={event.purchases}>
              {(purchase) => (
                <li>
                  {purchase.name} ({purchase.amount}) - {purchase.cost} за{' '}
                  {purchase.unitType.name}
                </li>
              )}
            </For>
          </ul>

          <div class="my-6">
            <Button
              onClick={() => setShowCreate((a) => !a)}
              rightIcon={<ChevronIcon />}
            >
              Добавить трату
            </Button>
            <Show when={showCreate()}>
              <CreateUpdatePurchase
                eventId={event.id}
                refetch={refetch}
                participants={participants}
              />
            </Show>
          </div>
        </div>
      </div>
      <div class="events-table">
        <h5>Таблица</h5>
        <EventTable eventId={event.id} />
      </div>

      <Button onClick={onCalculate}>Расчитать</Button>
    </div>
  )
}

const EventPage: Component = () => {
  const params = useParams()

  const fetcher = (eventId: string) =>
    api.eventsDetail(eventId).then((res) => res.data)

  const [event, { refetch }] = createResource(() => params.eventId, fetcher)

  const participantsFetcher = (eventId) =>
    api.participantsList({ eventId }).then((res) => res.data.data)
  const [participants, { refetch: refetchParticipants }] = createResource(
    () => params.eventId,
    participantsFetcher,
    { initialValue: [] }
  )

  const purchaseFetcher = (eventId) =>
    api.purchasesList({ eventId }).then((res) => res.data.data)
  const [purchases, { refetch: refetchPurchases, mutate: mutatePurchases }] =
    createResource(() => params.eventId, purchaseFetcher, { initialValue: [] })

  return (
    <Show when={event()} keyed>
      {(event) => (
        <Event
          event={event}
          participants={participants}
          purchases={purchases}
          refetch={refetch}
          refetchPurchases={refetchPurchases}
          refetchParticipants={refetchParticipants}
        />
      )}
    </Show>
  )
}

export default EventPage
