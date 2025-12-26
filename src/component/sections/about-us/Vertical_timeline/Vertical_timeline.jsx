import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Vertical_timeline.scss'

gsap.registerPlugin(ScrollTrigger)

const Vertical_timeline = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const progressLineRef = useRef(null);
  const timelineItemsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Timeline data
  const timelineData = [
    {
      id: 1,
      year: "2015",
      title: "Company Founded",
      description: "Our journey began with a vision to revolutionize the industry through innovative solutions.",
      icon: "🚀"
    },
    {
      id: 2,
      year: "2017",
      title: "First Major Project",
      description: "Successfully delivered our first large-scale project, establishing our reputation in the market.",
      icon: "🏆"
    },
    {
      id: 3,
      year: "2019",
      title: "Team Expansion",
      description: "Grew our talented team to 50+ members, bringing diverse expertise and fresh perspectives.",
      icon: "👥"
    },
    {
      id: 4,
      year: "2021",
      title: "Global Recognition",
      description: "Received international awards and expanded our services to global markets.",
      icon: "🌍"
    },
    {
      id: 5,
      year: "2023",
      title: "Innovation Hub",
      description: "Launched our innovation center, pushing boundaries with cutting-edge technology.",
      icon: "💡"
    },
    {
      id: 6,
      year: "2025",
      title: "Future Vision",
      description: "Continuing to innovate and lead the industry into the future with bold new initiatives.",
      icon: "⭐"
    },
    {
      id: 7,
      year: "2026",
      title: "Future Vision",
      description: "Continuing to innovate and lead the industry into the future with bold new initiatives.",
      icon: "⭐"
    },
    {
      id: 8,
      year: "2027",
      title: "Future Vision",
      description: "Continuing to innovate and lead the industry into the future with bold new initiatives.",
      icon: "⭐"
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const progressLine = progressLineRef.current;
    const timelineItems = timelineItemsRef.current;

    if (!section || !progressLine || timelineItems.length === 0) return;

    // Set initial states - hide all items except first
    gsap.set(progressLine, { height: "0%" });
    timelineItems.forEach((item, index) => {
      if (index === 0) {
        item.style.display = 'flex'; // Show first item instantly
      } else {
        item.style.display = 'none'; // Hide others instantly
      }
    });

    const totalItems = timelineData.length;

    // Calculate scroll distance for each item step
    const scrollPerItem = 300; // 300px scroll per item
    const totalScrollDistance = totalItems * scrollPerItem;

    // Create ScrollTrigger that pins the section and controls timeline
    const timelineTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${totalScrollDistance}px`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Calculate which item should be active
        const activeItemIndex = Math.floor(progress * totalItems);

        // Update active index state
        setActiveIndex(activeItemIndex);

        // Animate progress line
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
          gsap.to(progressLine, {
            width: `${progress * 100}%`,
            duration: 0.3,
            ease: "none"
          });
        } else {
          gsap.to(progressLine, {
            height: `${progress * 100}%`,
            duration: 0.3,
            ease: "none"
          });
        }

        // Show only the active item, hide others instantly
        timelineItems.forEach((item, index) => {
          if (index === activeItemIndex) {
            item.style.display = 'flex'; // Show active item instantly
          } else {
            item.style.display = 'none'; // Hide others instantly
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);




  return (
    <>
      <section className='vertical_scrolle' ref={sectionRef}>
        <div className='background'>
          <div className='timeline-container'>
            {/* Left Column - Years */}
            <div className='timeline-years-column'>
              <div className='timeline-progress'>
                <div className='progress-line' ref={progressLineRef}></div>
              </div>
              {timelineData.map((item, index) => (
                <div
                  key={`year-${item.id}`}
                  className={`timeline-year-item ${index === activeIndex ? 'active' : ''}`}
                >
                  <div className='timeline-year'>{item.year}</div>
                  <div className='timeline-dot'></div>
                </div>
              ))}
            </div>

            {/* Right Column - Content */}
            <div className='timeline-content-column'>
              {timelineData.map((item, index) => (
                <div
                  key={item.id}
                  className='timeline-content-wrapper'
                  ref={(el) => timelineItemsRef.current[index] = el}
                >
                  <div className='timeline-text-content'>
                    <div className='timeline-icon'>{item.icon}</div>
                    <h3 className='timeline-title'>{item.title}</h3>
                    <p className='timeline-description'>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Vertical_timeline