import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
 import Sidebar from '../components/Sidebar/SIdebar'
const MainLayout = () => {
  return (
    <div className='layout'
    >
    <Sidebar/>

      <main>
      <Navbar/>
      <Outlet/>

      </main>
    </div>
  )
}

export default MainLayout