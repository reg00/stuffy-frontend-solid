/* @refresh reload */
import './index.css'
import { render } from 'solid-js/web'
import { HopeThemeConfig, HopeProvider } from '@hope-ui/solid'
import { Router } from '@solidjs/router'

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
    <HopeProvider config={config}>
      <Router>
        <MyApp />
      </Router>
    </HopeProvider>
  )
}

render(() => <AppWithHope />, document.getElementById('root') as HTMLElement)
