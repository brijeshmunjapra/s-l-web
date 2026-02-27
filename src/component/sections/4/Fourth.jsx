import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFourthSectionImages } from '../../../store/slices/fourthSectionSlice'
import './Fourth.scss'

const Fourth = React.memo(() => {
  const dispatch = useDispatch()
  const { topRowImages, bottomRowImages, loading, error } = useSelector(state => state.fourthSection)
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef(null)
  const firstRowRef = useRef(null)
  const secondRowRef = useRef(null)
  const animationFrameRef = useRef(null)
  const startTimeRef = useRef(null)

  // Fetch images from API using Redux
  useEffect(() => {
    dispatch(fetchFourthSectionImages())
  }, [dispatch])

  // Animation function using requestAnimationFrame
  const animateMarquee = (timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp
    }

    const elapsed = timestamp - startTimeRef.current
    const duration = 40000 // 40 seconds for full cycle

    // Calculate progress (0 to 1)
    const progress = (elapsed % duration) / duration

    if (firstRowRef.current) {
      // First row: left to right (translateX from -50% to 0%)
      const firstRowTranslate = -50 + (progress * 50)
      firstRowRef.current.style.transform = `translateX(${firstRowTranslate}%)`
    }

    if (secondRowRef.current) {
      // Second row: right to left (translateX from 0% to -50%)
      const secondRowTranslate = progress * -50
      secondRowRef.current.style.transform = `translateX(${secondRowTranslate}%)`
    }

    animationFrameRef.current = requestAnimationFrame(animateMarquee)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          // Start the animation when section becomes visible
          animationFrameRef.current = requestAnimationFrame(animateMarquee)
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '50px' // Start animation 50px before section enters viewport
      }
    )

    const currentElement = sectionRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [hasAnimated])

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Show loading state
  if (loading) {
    return (
      <div ref={sectionRef} className="fourth-section">
        <div className="fourth-section-container">
          <div className="loading-state">
            <p>Loading images...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div ref={sectionRef} className="fourth-section">
        <div className="fourth-section-container">
          <div className="error-state">
            <p>Error loading images: {error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={sectionRef} className={`fourth-section ${hasAnimated ? 'animate' : ''}`}>
      <div className='fourth-section-container'>
        <div className='image-row first-row'>
          <div ref={firstRowRef} className='image-row-inner first-row-inner'>
            {topRowImages.map((img, index) => (
              <div key={`first-${img.id || index}`} className='image-item'>
                <img src={img.imageUrl} alt={img.alt || `Top row image ${index + 1}`} loading="lazy" />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {topRowImages.map((img, index) => (
              <div key={`first-duplicate-${img.id || index}`} className='image-item'>
                <img src={img.imageUrl} alt={img.alt || `Top row image ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className='image-row second-row'>
          <div ref={secondRowRef} className='image-row-inner second-row-inner'>
            {bottomRowImages.map((img, index) => (
              <div key={`second-${img.id || index}`} className='image-item'>
                <img src={img.imageUrl} alt={img.alt || `Bottom row image ${index + 1}`} loading="lazy" />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {bottomRowImages.map((img, index) => (
              <div key={`second-duplicate-${img.id || index}`} className='image-item'>
                <img src={img.imageUrl} alt={img.alt || `Bottom row image ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

export default Fourth
