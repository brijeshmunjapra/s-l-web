import React, { useEffect, useRef, useState } from 'react'
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

const Fourth = React.memo(() => {
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef(null)
  const firstRowRef = useRef(null)
  const secondRowRef = useRef(null)
  const animationFrameRef = useRef(null)
  const startTimeRef = useRef(null)

  const firstRowImages = [img1, img2, img3, img4, img5, img6]
  const secondRowImages = [img7, img8, img9, img10, img11, img1] // Using img1 again to make 6 images

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

  return (
    <div ref={sectionRef} className={`fourth-section ${hasAnimated ? 'animate' : ''}`}>
      <div className='fourth-section-container'>
        <div className='image-row first-row'>
          <div ref={firstRowRef} className='image-row-inner first-row-inner'>
            {firstRowImages.map((img, index) => (
              <div key={`first-${index}`} className='image-item'>
                <img src={img} alt={`Gallery ${index + 1}`} loading="lazy" />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {firstRowImages.map((img, index) => (
              <div key={`first-duplicate-${index}`} className='image-item'>
                <img src={img} alt={`Gallery ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className='image-row second-row'>
          <div ref={secondRowRef} className='image-row-inner second-row-inner'>
            {secondRowImages.map((img, index) => (
              <div key={`second-${index}`} className='image-item'>
                <img src={img} alt={`Gallery ${index + 7}`} loading="lazy" />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {secondRowImages.map((img, index) => (
              <div key={`second-duplicate-${index}`} className='image-item'>
                <img src={img} alt={`Gallery ${index + 7}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

export default Fourth
