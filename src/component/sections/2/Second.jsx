import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Second.scss'
import { fetchGallerySliders } from '../../../store/slices/gallerySlidersSlice'

const Second = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { sliders, loading, error } = useSelector(state => state.gallerySliders)

  useEffect(() => {
    dispatch(fetchGallerySliders())
  }, [dispatch])

  // Get images from the first active slider
  const firstSliderImages = sliders.length > 0 ? sliders[0].images : []

  // Handle image click to navigate to gallery
  const handleImageClick = () => {
    navigate('/gallery')
  }

  return (
    <div className='second-section'>
      <div className='second-section-content'>
        <div className='text-container'>
          <h1 className='main-heading section-heading'>ROMANTIC & ARTFUL</h1>
          <h2 className='sub-heading'>Emotive, editorial, and deeply romantic—my wedding photography is rooted in storytelling. I document love with an artful eye and a gentle approach, capturing every fleeting glance, quiet moment, and joyful celebration, with elegance.</h2>
        </div>
        <div className='photos-container'>
          {firstSliderImages.slice(0, 4).map((img, index) => (
            <div key={img.id || index} className='photo-wrapper'>
              <img
                src={img.imageUrl}
                alt={img.altText || `Gallery ${index + 1}`}
                className='couple-photo'
                loading="lazy"
                onClick={handleImageClick}
                style={{ cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Second