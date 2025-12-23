import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import useLenis from '../../hooks/useLenis'

const Layout = () => {

  const { lenis } = useLenis({
    scrollSpeed: 0.25,   
    duration: 1.5,      
    lerp: 0.18   
  });

  return (
    <>
      <Outlet />
    </>
  )
}

export default Layout

