import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from '@hope-ui/solid'
import { A } from '@solidjs/router'
import { onMount } from 'solid-js'
import api from '../api/api'

function EventsPage() {
  const req = () => {
    api.eventsList()
  }

  onMount(() => {
    req()
  })

  return (
    <div class="p-8">
      <h1>Events Page</h1>
    </div>
  )
}

export default EventsPage
