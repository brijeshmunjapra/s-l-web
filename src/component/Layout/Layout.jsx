import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import useLenis from '../../hooks/useLenis'
import ScrollToTop from './ScrollToTop'

const Layout = () => {

  useLenis({
    scrollSpeed: 0.4,
    duration: 1.2,
    lerp: 0.18        // Balanced lerp for good smoothness
  });

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout

