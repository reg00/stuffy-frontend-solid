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
import { createSignal, Show, useContext } from 'solid-js'
import { A, useNavigate } from '@solidjs/router'
import { AuthContext } from '../features/auth/useAuth'

function SignUpPage() {
  const [showEmailConfirmation, setShowEmailConfirmation] = createSignal(false)

  const [state, { signUp }] = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const username = e.target.username.value
    const password = e.target.password.value
    const email = e.target.email.value

    const passwordRepeat = e.target.passwordRepeat.value

    if (password !== passwordRepeat) {
      return
    }

    const payload = { username, password, email }

    await signUp(payload)

    setShowEmailConfirmation(true)
  }

  return (
    <div class="grid flex-1 place-items-center">
      <div class="max-w-md">
        <form class="flex flex-col gap-5" onSubmit={handleSubmit}>
          <FormControl required>
            <FormLabel for="username">Имя пользователя</FormLabel>
            <Input id="username" />
          </FormControl>
          <FormControl required>
            <FormLabel for="email">Email</FormLabel>
            <Input id="email" type="email" />
          </FormControl>
          <FormControl required>
            <FormLabel for="password">Пароль</FormLabel>
            <Input id="password" type="password" />
          </FormControl>
          <FormControl required>
            <FormLabel for="passwordRepeat">Повторите пароль</FormLabel>
            <Input id="passwordRepeat" type="password" />
          </FormControl>
          <Button type="submit">Зарегистрироваться</Button>
          <p>
            У вас уже есть аккаунт? <A href="/login">Хотите войти?</A>
          </p>
        </form>
        <Show when={showEmailConfirmation()}>
          <Alert status="success">
            <AlertIcon class="mr-2"/>
            На вашу почту было отправлено письмо с подтверждением, перейдите по ссылке в письме
          </Alert>
        </Show>
      </div>
    </div>
  )
}

export default SignUpPage
