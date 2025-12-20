import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Observer } from 'gsap/observer'
import { SplitText } from 'gsap/SplitText'
import Navbar from '../../component/Navbar/Navbar'
import Footer from '../../component/Footer/Footer'
import HeroBanner from '../../component/Hero/HeroBanner'
import First from '../../component/sections/1/First'
import Second from '../../component/sections/2/Second'
// import Third from '../../component/sections/3/Third'
import Fourth from '../../component/sections/4/Fourth'
import Fifth from '../../component/sections/5/Fifth'
import Sixth from '../../component/sections/6/Sixth'
import Seventh from '../../component/sections/7/Seventh'
import './Home.scss'

const Home = () => {
  const containerRef = useRef(null)
  const firstRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(Observer, SplitText)

    const sections = gsap.utils.toArray("section", containerRef.current)
    const images = gsap.utils.toArray(".bg", containerRef.current)
    const headings = gsap.utils.toArray(".section-heading", containerRef.current)
    const outerWrappers = gsap.utils.toArray(".outer", containerRef.current)
    const innerWrappers = gsap.utils.toArray(".inner", containerRef.current)

    // Optimize SplitText for better performance - only split when needed
    const splitHeadings = headings.map(heading => {
      if (heading && heading.textContent.trim()) {
        return new SplitText(heading, {
          type: "chars",
          linesClass: "clip-text"
        })
      }
      return null
    })

    let currentIndex = -1
    let animating = false
    let lastScrollTime = 0

    gsap.set(outerWrappers, { yPercent: 100 })
    gsap.set(innerWrappers, { yPercent: -100 })

    function gotoSection(index, direction) {
      // Prevent scrolling beyond bounds
      if (index < 0 || index >= sections.length || animating) return

      // Throttle scroll events to prevent rapid firing
      const now = Date.now()
      if (now - lastScrollTime < 100) return
      lastScrollTime = now

      animating = true
      const fromTop = direction === -1
      const dFactor = fromTop ? -1 : 1

      // Create optimized timeline with shorter duration for smoother feel
      const tl = gsap.timeline({
        defaults: {
          duration: 0.5, // Reduced from 0.8 for faster response
          ease: "power2.inOut" // Changed to power2 for smoother motion
        },
        onComplete: () => {
          animating = false
        }
      })

      // Handle previous section cleanup
      if (currentIndex >= 0) {
        gsap.set(sections[currentIndex], { zIndex: 0 })
        tl.to(images[currentIndex], {
          yPercent: -15 * dFactor,
          duration: 0.4
        }, 0)
          .set(sections[currentIndex], { autoAlpha: 0 })
      }

      // Set up new section
      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 })

      // Animate wrappers with optimized timing
      tl.fromTo([outerWrappers[index], innerWrappers[index]], {
          yPercent: i => i ? -100 * dFactor : 100 * dFactor
        }, {
          yPercent: 0,
          duration: 0.6
        }, 0)
        .fromTo(images[index], {
          yPercent: 15 * dFactor
        }, {
          yPercent: 0,
          duration: 0.6
        }, 0)

      // Animate text with reduced stagger for better performance
      if (splitHeadings[index] && splitHeadings[index].chars) {
        tl.fromTo(splitHeadings[index].chars, {
            autoAlpha: 0,
            yPercent: 100 * dFactor // Reduced from 150 for smoother animation
          }, {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.4, // Reduced duration
            ease: "power2.out",
            stagger: {
              each: 0.015, // Reduced stagger time
              from: "start" // Changed from "random" to "start" for more predictable animation
            }
          }, 0.1) // Earlier start time
      }

      currentIndex = index

      // Trigger First section animation when it becomes active
      if (index === 1 && firstRef.current) {
        // Add small delay to prevent conflicts
        gsap.delayedCall(0.3, () => {
          if (firstRef.current) {
            firstRef.current.playAnimation()
          }
        })
      }
    }

    // Optimized Observer configuration
    const observer = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: 0.5, // Positive value for natural scrolling
      onDown: () => !animating && gotoSection(currentIndex + 1, 1), // Scroll down = next section
      onUp: () => !animating && gotoSection(currentIndex - 1, -1), // Scroll up = previous section
      tolerance: 15, // Increased tolerance to prevent multiple triggers
      preventDefault: false, // Allow normal scrolling behavior
      debounce: true // Add debouncing
    })

    // Start with first section
    // Delay initial section display to allow images to load
    gsap.delayedCall(0.1, () => {
      gotoSection(0, 1)
    })

    // Cleanup function
    return () => {
      if (observer) observer.kill()
      splitHeadings.forEach(split => {
        if (split && split.revert) split.revert()
      })
      // Kill any ongoing animations
      gsap.killTweensOf([outerWrappers, innerWrappers, images])
    }
  }, [])

  return (
    <>
    <div ref={containerRef}>
      <section className="hero">
        <Navbar />
        <div className="outer">
          <div className="inner">
            <div className="bg">
              <HeroBanner />
            </div>
          </div>
        </div>
      </section>

      <section className="first">
        <div className="outer">
          <div className="inner">
            <div className="bg">
              <First ref={firstRef} />
            </div>
          </div>
        </div>
      </section>

      <section className="second">
        <div className="outer">
          <div className="inner">
            <div className="bg">
              <Second />
            </div>
          </div>
        </div>
      </section>

      {/* <section className="third">
        <div className="outer">
          <div className="inner">
            <div className="bg">
              <Third />
            </div>
          </div>
        </div>
      </section> */}

      <section className="fourth">
        <div className="outer">
          <div className="inner">
            <div className="bg">
              <Fourth />
            </div>
          </div>
        </div>
      </section>

      <section className="fifth">
        <div className="outer">
          <div className="inner">
            <div className="bg">
              <Fifth />
            </div>
          </div>
        </div>
      </section>

      <section className="sixth">
        <div className="outer">
          <div className="inner">
            <div className="bg">
              <Sixth />
            </div>
          </div>
        </div>
      </section>

      <section className="seventh">
        <div className="outer">
          <div className="inner">
            <div className="bg">
              <Seventh />
            </div>
          </div>
        </div>
      </section>

      <section className="footer-section">
        <div className="outer">
          <div className="inner">
            <div className="bg">
              <Footer />
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default Home

