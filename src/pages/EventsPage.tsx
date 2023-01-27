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
import EventCard from '../features/events/components/EventCard'

function EventsPage() {
  // const req = () => {
  //   api.eventsList()
  // }

  const fetcher = () => api.eventsList().then((res) => res.data.data)

  const [events] = createResource(fetcher)

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

      <div class="flex flex-col">
        <For each={events()} fallback={<div>Загрузка...</div>}>
          {(event) => <EventCard {...event} />}
        </For>
      </div>
    </div>
  )
}

export default EventsPage
