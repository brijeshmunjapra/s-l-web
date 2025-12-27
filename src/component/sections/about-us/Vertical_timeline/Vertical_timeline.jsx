import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Vertical_timeline.scss'
import backgroundImage from '../../../../assets/about-us/1.jpg'
import backgroundImage1 from '../../../../assets/fourth-section/1.webp'
import backgroundImage2 from '../../../../assets/fourth-section/2.webp'
import backgroundImage3 from '../../../../assets/fourth-section/3.webp'

gsap.registerPlugin(ScrollTrigger)

const Vertical_timeline = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineItemsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Timeline data
  const timelineData = [
    {
      id: 1,
      year: "2015",
      title: "Company Founded",
      description: "Our journey began with a vision to revolutionize the industry through innovative solutions.",
      icon: "🚀",
      backgroundImage: `url(${backgroundImage})`
    },
    {
      id: 2,
      year: "2017",
      title: "First Major Project",
      description: "Successfully delivered our first large-scale project, establishing our reputation in the market.",
      icon: "🏆",
      backgroundImage: `url(${backgroundImage1})`
    },
    {
      id: 3,
      year: "2019",
      title: "Team Expansion",
      description: "Grew our talented team to 50+ members, bringing diverse expertise and fresh perspectives.",
      icon: "👥",
      backgroundImage: `url(${backgroundImage2})`
    },
    {
      id: 4,
      year: "2021",
      title: "Global Recognition",
      description: "Received international awards and expanded our services to global markets.",
      icon: "🌍",
      backgroundImage: `url(${backgroundImage3})`
    },
    {
      id: 5,
      year: "2023",
      title: "Innovation Hub",
      description: "Launched our innovation center, pushing boundaries with cutting-edge technology.",
      icon: "💡",
      backgroundImage: `url(${backgroundImage})`
    },
    {
      id: 6,
      year: "2025",
      title: "Future Vision",
      description: "Continuing to innovate and lead the industry into the future with bold new initiatives.",
      icon: "⭐",
      backgroundImage: `url(${backgroundImage})`
    },
    {
      id: 7,
      year: "2026",
      title: "Future Vision",
      description: "Continuing to innovate and lead the industry into the future with bold new initiatives.",
      icon: "⭐",
      backgroundImage: `url(${backgroundImage})`
    },
    {
      id: 8,
      year: "2027",
      title: "Future Vision",
      description: "Continuing to innovate and lead the industry into the future with bold new initiatives.",
      icon: "⭐",
      backgroundImage: `url(${backgroundImage})`
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const timelineItems = timelineItemsRef.current;

    if (!section || timelineItems.length === 0) return;

    // Set initial states - hide all items except first
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
        <div
          className='background'
          style={{
            backgroundImage: timelineData[activeIndex]?.backgroundImage
          }}
        >
          <div className='timeline-container'>
            {/* Left Column - Years */}
            <div className='timeline-years-column'>
              {timelineData.map((item, index) => {
                // Show only current, previous, and next items for centered view
                const isVisible = Math.abs(index - activeIndex) <= 1;
                return (
                  <div
                    key={`year-${item.id}`}
                    className={`timeline-year-item ${index === activeIndex ? 'active center' : ''} ${isVisible ? 'visible' : 'hidden'}`}
                    style={{
                      transform: `translateY(${(index - activeIndex) * 80}px)`,
                      opacity: isVisible ? 1 : 0,
                      transition: 'all 0.5s ease'
                    }}
                  >
                    <div className='timeline-year'>{item.year}</div>
                    <div className='timeline-dot'></div>
                  </div>
                );
              })}
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