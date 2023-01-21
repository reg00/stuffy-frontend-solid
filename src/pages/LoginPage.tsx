import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from '@hope-ui/solid'
import { A } from '@solidjs/router'

function LoginPage() {
  return (
    <div class="grid flex-1 place-items-center">
      <div class="max-w-md">
        <form class="flex flex-col gap-5">
          <FormControl required>
            <FormLabel for="username">Имя пользователя</FormLabel>
            <Input id="username" />
          </FormControl>
          <FormControl required>
            <FormLabel for="password">Пароль</FormLabel>
            <Input id="password" type="password" />
          </FormControl>
          <Button>Войти</Button>
            <A href="/signup">Хотите зарегистрироваться?</A>
        </form>
      </div>
</div>
  )
}

export default LoginPage

