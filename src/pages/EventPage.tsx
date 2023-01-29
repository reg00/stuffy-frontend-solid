import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@hope-ui/solid'
import { useParams } from '@solidjs/router'
import { Component, createResource, Show } from 'solid-js'
import api from '../api/api'
import { GetEventEntry } from '../api/__generated__/stuffyHelperApi'
import { formatDate } from '../features/dates'

import './Event.css'

const Event: Component<GetEventEntry> = (event) => {
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
        <p>Тут бубут участники</p>
      </div>
      <div class="event__shopping-list">
        <div class="list__header">
          <h3>Покупки:</h3>
          тут бубут покупки?
          {/* <IconButton
            class="shopping__add-btn"
            component={Link}
            color="success"
            size="small"
            to={`/events/${event.id}/shoppings/new`}
          >
            <AddIcon />
          </IconButton> */}
        </div>

        <ul>тут што?</ul>
      </div>
    </div>
  )
}

const EventPage: Component = () => {
  const params = useParams()

  const fetcher = (eventId: string) =>
    api.eventsDetail(eventId).then((res) => res.data)

  const [event] = createResource(() => params.eventId, fetcher)

  return (
    <Show when={event()} keyed>
      {(event) => <Event {...event} />}
    </Show>
  )
}

export default EventPage
