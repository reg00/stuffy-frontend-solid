import { Accessor, createContext, createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import api from '../../api/api'
import { GetUserEntry } from '../../api/__generated__/stuffyHelperApi'

type LoginModel = {
  username: string
  password: string
}

type State = {
  user: GetUserEntry | null
  loading: boolean
}
export const AuthContext = createContext([{user: null, loading: false}, {login: undefined}])

export function AuthProvider(props) {
  // const [user, setUser] = createSignal<GetUserEntry>()
  // const [loading, setLoading] = createSignal(false)
  const [state, setState] = createStore({user: null, loading: false});

  const setLoading = (val: boolean) => {
    setState('loading', val)
  }


  async function login(payload: LoginModel) {
    setLoading(true)

    try {
      await api.authLoginCreate(payload)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  //   const store = [state, {}]

  const store = [
    state,
    {login}
  ]
  
  return (
    <AuthContext.Provider value={store}>{props.children}</AuthContext.Provider>
  )
}

// export default useAuth
