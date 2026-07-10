import React from 'react'
import "./mainlayout.scss"
import { Outlet } from 'react-router-dom'
import Navbar from "../components/Navbar/Navbar"
 import Sidebar from '../components/Sidebar/Sidebar'
import Player from '../features/music/Player/Player'
const MainLayout = () => {
  return (
    <div className='layout'
    >
    <Sidebar/>

      <main>
    <Navbar/>
      <Outlet/>

      <Player/>

      </main>
    </div>
  )
}

export default MainLayout