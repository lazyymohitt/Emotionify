import React from 'react'
import "./mainlayout.scss"
import { Outlet } from 'react-router-dom'
import Navbar from "../components/Navbar/Navbar"
 import Sidebar from '../components/Sidebar/Sidebar'
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