
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Alert,
  AlertIcon,
} from '@hope-ui/solid'
import { A, useNavigate } from '@solidjs/router'
import { onMount } from 'solid-js'

function SignUpSuccessPage() {

    const navigate = useNavigate()

    onMount(() => {
        setTimeout(() => {
            navigate('/')
        }, 3_000)
    })




  return (
    <div class="grid flex-1 place-items-center">
          <Alert status="success">
            <AlertIcon class="mr-2"/>
             Вы успешно зарегистрированы
          </Alert>
    </div>
  )
}

export default SignUpSuccessPage
