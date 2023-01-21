import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from '@hope-ui/solid'
import { A } from '@solidjs/router'

function SignUpPage() {
  return (
    <div class="grid flex-1 place-items-center">
      <div class="max-w-md">
        <form class="flex flex-col gap-5">
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
          <Button>Зарегистрироваться</Button>
          <p>У вас уже есть аккаунт? <A href="/login">Хотите войти?</A></p>
            
        </form>
      </div>
</div>
  )
}

export default SignUpPage
