import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from '@hope-ui/solid'
import { A } from '@solidjs/router'
import { useContext } from 'solid-js'
import { AuthContext } from '../features/auth/useAuth'

function LoginPage() {
  const [state, {login}]= useContext(AuthContext)

  console.log("LOGIN", login)
  



  const handleSubmit = e => {
    e.preventDefault()


    const username = e.target.username.value

    const password = e.target.password.value

    const payload = {username, password}

    login(payload)
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
            <FormLabel for="password">Пароль</FormLabel>
            <Input id="password" type="password" />
          </FormControl>
          <Button type='submit' disabled={state.loading} loading={state.loading}>Войти</Button>
            <A href="/signup">Хотите зарегистрироваться?</A>
        </form>
      </div>
</div>
  )
}

export default LoginPage

