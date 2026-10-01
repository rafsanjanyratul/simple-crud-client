import { Suspense, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Users from './components/Users'

const usersPromise = fetch("http://localhost:3000/users").then(res=>res.json())

function App() {

  return (
    <>
      
          <h1>user crud</h1>

          <Suspense  fallback={<h3>loading...</h3>}>
            <Users usersPromise={usersPromise}></Users>
          </Suspense>
 
    </>
  )
}

export default App
