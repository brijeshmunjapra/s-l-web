import React from 'react'
import ContactUs from './ContactUs'
import "./contacUs.scss";

const Rout_ContactUs = () => {
  return (
    <>
      <div className="Contact_space">
        <div className="Contact-video">
          <h2>
            Start Documenting Your Story
          </h2>
          <video className="video" src="https://event-pdf-crm.s3.ap-south-1.amazonaws.com/wesite-images/V%26V+INSTA+STORY+2.mp4" alt="About Us" autoPlay muted loop />
        </div>
        <ContactUs />
      </div>
    </>
  )
}

export default Rout_ContactUs