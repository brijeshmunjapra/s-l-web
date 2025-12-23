import React from 'react'
import './Second.scss'
import coupleImage1 from '../../../assets/second-section/1.webp'
import coupleImage2 from '../../../assets/second-section/2.webp'
import coupleImage3 from '../../../assets/second-section/3.webp'
import coupleImage4 from '../../../assets/second-section/4.webp'

const Second = () => {
  return (
    <div className='second-section'>
      <div className='second-section-content'>
        <div className='text-container'>
          <h1 className='main-heading section-heading'>ROMANTIC & ARTFUL</h1>
          <h2 className='sub-heading'>Emotive, editorial, and deeply romantic—my wedding photography is rooted in storytelling. I document love with an artful eye and a gentle approach, capturing every fleeting glance, quiet moment, and joyful celebration, with elegance.</h2>
        </div>
        <div className='photos-container'>
          <div className='photo-wrapper'>
            <img src={coupleImage1} alt="Abhay & Shruti" className='couple-photo' />
          </div>
          <div className='photo-wrapper'>
            <img src={coupleImage2} alt="Abhay & Shruti" className='couple-photo' />
          </div>
          <div className='photo-wrapper'>
            <img src={coupleImage3} alt="Abhay & Shruti" className='couple-photo' />
          </div>
          <div className='photo-wrapper'>
            <img src={coupleImage4} alt="Abhay & Shruti" className='couple-photo' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Second