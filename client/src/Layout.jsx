import React from 'react'
import Header from './Header.jsx'
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <main className='max-w-screen-md my-0 mx-auto'>
        <Header/>
        <Outlet/>
    </main>
  )
}

export default Layout