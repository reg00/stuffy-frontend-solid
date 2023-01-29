import { onMount, Show } from "solid-js"
import { AuthContext, makeAuthContext } from "./useAuth"

function AuthProvider(props) {
    const store = makeAuthContext()

    onMount(() => {
        store[1].getUserInfo()
    })

    return (
        <Show when={!store[0].loading()} fallback={<p>Загрузка...</p>}>
            <AuthContext.Provider value={store}>
                {props.children}
            </AuthContext.Provider>
        </Show>

    )

}

export default AuthProvider