import React from 'react'
import './Second.scss'
import coupleImage from '../../../assets/second-section/image.webp'

const Second = () => {
  return (
    <div className='second-section'>
      <div className='second-section-content'>
        <div className='text-container'>
          <h1 className='main-heading'>ROMANTIC & ARTFUL</h1>
          <h2 className='sub-heading'>WEDDING PHOTOGRAPHY</h2>
        </div>
        <div className='photos-container'>
          <div className='photo-wrapper'>
            <img src={coupleImage} alt="Abhay & Shruti" className='couple-photo' />
          </div>
          <div className='photo-wrapper'>
            <img src={coupleImage} alt="Abhay & Shruti" className='couple-photo' />
          </div>
          <div className='photo-wrapper'>
            <img src={coupleImage} alt="Abhay & Shruti" className='couple-photo' />
          </div>
          <div className='photo-wrapper'>
            <img src={coupleImage} alt="Abhay & Shruti" className='couple-photo' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Second