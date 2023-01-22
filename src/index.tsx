/* @refresh reload */
import './index.css'
import { render } from 'solid-js/web'
import { HopeThemeConfig, HopeProvider } from '@hope-ui/solid'
import { Router } from '@solidjs/router'

import { AuthProvider } from './features/auth/useAuth'

import MyApp from './App'

// 2. Create a theme config to include custom colors, fonts, etc
const config: HopeThemeConfig = {
  lightTheme: {
    colors: {
      primary9: 'salmon',
    },
  },
}

// 3. Pass the `config` prop to the `HopeProvider`
function AppWithHope() {
  return (
    <Router>
      <AuthProvider>
        <HopeProvider config={config}>
          <MyApp />
        </HopeProvider>
      </AuthProvider>
    </Router>
  )
}

render(() => <AppWithHope />, document.getElementById('root') as HTMLElement)
