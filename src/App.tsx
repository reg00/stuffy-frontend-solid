import type { Component } from 'solid-js';
import { Routes, Route, Navigate } from '@solidjs/router';
import Login from './pages/LoginPage'
import SignUp from './pages/SignUpPage'

const App: Component = () => {
  return (
    <div class="min-h-screen flex flex-col">
      <header>header</header>
      <div class="flex flex-1">
      <Routes>
         <Route path="/login" component={Login} />
         <Route path="/signup" component={SignUp} />
         <Route path='/'>
          <Navigate href='/login' />
         </Route>


      </Routes>
      </div>
    </div>
  );
};

export default App;
