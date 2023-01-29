import { Component, Show, useContext } from 'solid-js'
import { Routes, Route, Navigate, A } from '@solidjs/router'
import Login from './pages/LoginPage'
import SignUp from './pages/SignUpPage'
import SignOut from './pages/SignoutPage'
import Events from './pages/EventsPage'
import Event from './pages/EventPage'
import SignUpSuccess from './pages/SignUpSuccessPage'
import { AuthContext } from './features/auth/useAuth'
import { Avatar, IconButton, Tooltip } from '@hope-ui/solid'

import LogoutIcon from './features/icons/LogoutIcon'

const App: Component = () => {
  const [state, { logout }] = useContext(AuthContext)

  return (
    <div class="min-h-screen flex flex-col">
      <header>
        <nav class="bg-white border-b border-solid border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
          <div class="container flex flex-wrap items-center mx-auto">
            <A href={'/'} class="flex items-center">
              Stuffy helper
            </A>
            <div class="ml-auto">
              <Show when={state.user} fallback={<A href={'/login'}>Войти</A>}>
                <div class="inline-flex flex-nowrap gap-1 items-center">

                  <A href='#' class="inline-flex flex-nowrap gap-1 items-center">
                    <Avatar name="Илья Салмасов" />
                    Илья Салмасов
                  </A>

                  <Tooltip label="Выйти">
                    <A href='/signout' class="ml-1">
                    <IconButton variant="ghost" aria-label="Search" icon={<LogoutIcon />} />
                    </A>
                  </Tooltip>
                </div>
                {/* <A href={'/signout'}>Выйти</A> */}
              </Show>
            </div>
            {/* <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button> */}
            {/* <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
        </li>
      </ul>
    </div> */}
          </div>
        </nav>
      </header>
      <div class="flex flex-1">
        <div class="container mx-auto">

        <Routes>
          <Route path="/login" component={Login} />
          <Route path="/signup/success" component={SignUpSuccess} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signout" component={SignOut} />
          <Route path="/events/:eventId" component={Event} />
          <Route path="/" component={Events} />
        </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
