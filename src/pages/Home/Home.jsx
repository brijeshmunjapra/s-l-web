import React from 'react'
import HeroBanner from '../../component/Hero/HeroBanner'
import First from '../../component/sections/1/First'
import Second from '../../component/sections/2/Second'
import Fourth from '../../component/sections/4/Fourth'
import Fifth from '../../component/sections/5/Fifth'
import Sixth from '../../component/sections/6/Sixth'
import Seventh from '../../component/sections/7/Seventh'
import ContactUs from '../ContactUs/ContactUs'

const Home = () => {
  return (
    <>
      <HeroBanner />
      <First />
      <Second />
      {/* <Third /> */}
      <ContactUs/>
      <Fourth />
      <Fifth />
      <Sixth />
      <Seventh />
    </>
  )
}

export default Home

