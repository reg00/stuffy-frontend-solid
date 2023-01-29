import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@hope-ui/solid'
import { A } from '@solidjs/router'
import { createResource, For, onMount } from 'solid-js'
import api from '../api/api'
import CreateEvent from '../features/events/components/CreateEvent'
import EventCard from '../features/events/components/EventCard'

function EventsPage() {
  // const req = () => {
  //   api.eventsList()
  // }

  const fetcher = () => api.eventsList().then((res) => res.data.data)

  const [events, { refetch }] = createResource(fetcher)

  // onMount(() => {
  //   req()
  // })

  return (
    <div class="w-full p-2">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink currentPage>Эвенты</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <CreateEvent refetch={refetch} />

      <div class="flex flex-col gap-2">
        <For each={events()} fallback={<div>Загрузка...</div>}>
          {(event) => <EventCard {...event} />}
        </For>
      </div>
    </div>
  )
}

export default EventsPage
