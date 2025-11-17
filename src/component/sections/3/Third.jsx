import React from 'react'
import './Third.scss'
import leftTopImage from '../../../assets/third-section/left-top.webp'
import leftBottomImage from '../../../assets/third-section/left-bottom.webp'
import rightImage from '../../../assets/third-section/right.webp'

const Third = () => {
  return (
    <div className='third-section'>
      <div className='third-section-container'>
        <div className='left-images'>
          <div className='left-top-image-wrapper'>
            <img src={leftTopImage} alt="Couple on beach" className='left-top-image' />
          </div>
          <div className='left-bottom-image-wrapper'>
            <img src={leftBottomImage} alt="Couple on swing" className='left-bottom-image' />
          </div>
        </div>
        
        <div className='center-content'>
          <p className='book-session-text'>BOOK A SESSION NOW</p>
          <h1 className='main-heading'>
            Ready To Transform Everyday<br />
            Moment Into Timeless<br />
            Memories?
          </h1>
          <div className='golden-line'></div>
          <button className='get-in-touch-btn'>GET IN TOUCH</button>
        </div>
        
        <div className='right-image'>
          <div className='right-image-wrapper'>
            <img src={rightImage} alt="Couple with hot air balloons" className='right-image-img' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Third