import React, { useEffect, useRef, useState } from 'react'
import './Our_Gallery.scss'
import img1 from '../../../../assets/fourth-section/1.webp'
import img2 from '../../../../assets/fourth-section/2.webp'
import img3 from '../../../../assets/fourth-section/3.webp'
import img4 from '../../../../assets/fourth-section/4.webp'
import img5 from '../../../../assets/fourth-section/5.webp'
import img6 from '../../../../assets/fourth-section/6.webp'

const Our_Gallery = () => {
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef(null)
  const firstRowRef = useRef(null)
  const animationFrameRef = useRef(null)
  const startTimeRef = useRef(null)

  const firstRowImages = [img1, img2, img3, img4, img5, img6]

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
    <>
      <div className="section">
        <div className="flex">
          <div className="grid-5">
            <h2>Our Gallery</h2>
          </div>
          <div className="grid-5">
            <p className='Gallery-text'>When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
          </div>
        </div>

        {/* Marquee Slider */}
        <div ref={sectionRef} className={`gallery-marquee ${hasAnimated ? 'animate' : ''}`}>
          <div className='image-row first-row-2'>
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
        </div>

        <div className="text">
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
        </div>

      </div>
    </>
  )
}

export default Our_Gallery