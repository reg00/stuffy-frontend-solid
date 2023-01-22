import { Accessor, createContext, createSignal, } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { createStore } from 'solid-js/store'
import api, {instance} from '../../api/api'
import { GetUserEntry } from '../../api/__generated__/stuffyHelperApi'
import setupAxiosInterceptors from './middlewares'


type User = Required<GetUserEntry>

type LoginModel = {
  username: string
  password: string
}

export const AuthContext = createContext([{user: null, loading: false}, {login: undefined}])

export function AuthProvider(props) {
  const navigate = useNavigate()
  const [state, setState] = createStore({user: null, loading: false});
  
  setupAxiosInterceptors(instance, navigate)

  const setLoading = (val: boolean) => {
    setState('loading', val)
  }

  const setUser = (val: User) => {
    setState('user', val)
  }


  async function login(payload: LoginModel) {
    setLoading(true)

    try {
      const {data} = await api.authLoginCreate(payload)

      setUser(data as User)
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  const store = [
    state,
    {login}
  ]
  
  return (
    <AuthContext.Provider value={store}>{props.children}</AuthContext.Provider>
  )
}

// export default useAuth
