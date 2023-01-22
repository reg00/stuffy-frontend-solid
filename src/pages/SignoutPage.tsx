import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from '@hope-ui/solid'
import { A, useNavigate, Navigate } from '@solidjs/router'
import { createSignal, useContext, Show, onMount } from 'solid-js'
import { AuthContext } from '../features/auth/useAuth'

function SignoutPage() {
  const [state, { logout }] = useContext(AuthContext)

  const [signoutSuccess, setSignoutSuccess] = createSignal(false)

  onMount(async () => {
    await logout()


    setSignoutSuccess(true)
  })

  return (
    <Show when={signoutSuccess()}>
      <Navigate href={'/login'}/>
    </Show>
  )
}

export default SignoutPage
