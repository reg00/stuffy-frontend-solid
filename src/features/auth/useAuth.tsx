import {
  Accessor,
  createContext,
  createSignal,
  lazy,
  onMount,
  Show,
  Suspense,
} from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { createStore } from 'solid-js/store'
import api, { instance } from '../../api/api'
import {
  GetUserEntry,
  RegisterModel,
} from '../../api/__generated__/stuffyHelperApi'
import setupAxiosInterceptors from './middlewares'

type User = Required<GetUserEntry>

type LoginModel = {
  username: string
  password: string
}

export const AuthContext = createContext([
  { user: null, loading: false },
  {
    login: undefined,
    signUp: undefined,
    logout: undefined,
    getUserInfo: undefined,
  },
])

export function AuthProvider(props) {
  const navigate = useNavigate()
  const [state, setState] = createStore({ user: null, loading: false })

  setupAxiosInterceptors(instance, navigate)

  const setLoading = (val: boolean) => {
    setState('loading', val)
  }

  const setUser = (val: User | null) => {
    setState('user', val)
  }

  async function login(payload: LoginModel) {
    setLoading(true)

    try {
      const { data } = await api.authLoginCreate(payload)

      console.log('datl', data)

      setUser(data as User)
    } finally {
      setLoading(false)
    }
  }

  async function signUp(payload: RegisterModel) {
    setLoading(true)

    try {
      const { data } = await api.authRegisterCreate(payload)

      // Тут бек не возвращает User, но написано что возвращает
      // setUser(data as User)
    } finally {
      setLoading(false)
    }
  }

  async function getUserInfo() {
    setLoading(true)

    try {
      const { data } = await api.authAccountList()

      setUser(data as User)
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    setLoading(true)

    try {
      await api.authLogoutCreate()

      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const store = [state, { login, signUp, getUserInfo, logout }]

  onMount(() => {
    getUserInfo()
  })

  return (
    <Show when={!state.loading} fallback={<p>Загрузка...</p>}>
      <AuthContext.Provider value={store}>
        {props.children}
      </AuthContext.Provider>
    </Show>
  )
}

// export default useAuth
