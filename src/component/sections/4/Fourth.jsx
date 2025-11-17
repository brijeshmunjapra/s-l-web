import React from 'react'
import './Fourth.scss'
import img1 from '../../../assets/fourth-section/1.webp'
import img2 from '../../../assets/fourth-section/2.webp'
import img3 from '../../../assets/fourth-section/3.webp'
import img4 from '../../../assets/fourth-section/4.webp'
import img5 from '../../../assets/fourth-section/5.webp'
import img6 from '../../../assets/fourth-section/6.webp'
import img7 from '../../../assets/fourth-section/7.webp'
import img8 from '../../../assets/fourth-section/8.webp'
import img9 from '../../../assets/fourth-section/9.webp'
import img10 from '../../../assets/fourth-section/10.webp'
import img11 from '../../../assets/fourth-section/11.webp'

const Fourth = () => {
  const firstRowImages = [img1, img2, img3, img4, img5, img6]
  const secondRowImages = [img7, img8, img9, img10, img11, img1] // Using img1 again to make 6 images

  return (
    <div className='fourth-section'>
      <div className='fourth-section-container'>
        <div className='image-row first-row'>
          <div className='image-row-inner first-row-inner'>
            {firstRowImages.map((img, index) => (
              <div key={`first-${index}`} className='image-item'>
                <img src={img} alt={`Gallery ${index + 1}`} />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {firstRowImages.map((img, index) => (
              <div key={`first-duplicate-${index}`} className='image-item'>
                <img src={img} alt={`Gallery ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        
        <div className='image-row second-row'>
          <div className='image-row-inner second-row-inner'>
            {secondRowImages.map((img, index) => (
              <div key={`second-${index}`} className='image-item'>
                <img src={img} alt={`Gallery ${index + 7}`} />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {secondRowImages.map((img, index) => (
              <div key={`second-duplicate-${index}`} className='image-item'>
                <img src={img} alt={`Gallery ${index + 7}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fourth
