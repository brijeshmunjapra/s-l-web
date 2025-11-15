import React from 'react'
import './First.scss'
import leftImage from '../../../assets/first-section/left.webp'
import rightImage from '../../../assets/first-section/right.webp'

const First = () => {
  return (
    <div className='first-section'>
      <div className='first-section-left'>
        <img src={leftImage} alt="Portrait" className='left-image' />
      </div>
      <div className='first-section-right'>
        <div className='headline-text'>
          <div className='headline-line headline-line-1'>TIMELESS.</div>
          <div className='headline-line headline-line-2'>SOULFUL.</div>
          <div className='headline-line headline-line-3'>UNFORGETTABLE.</div>
        </div>
        <div className='body-text'>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
        </div>
        <div className='right-image-container'>
          <img src={rightImage} alt="Wedding couple" className='right-image' />
        </div>
      </div>
    </div>
  )
}

export default First