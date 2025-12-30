import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Vertical_timeline.scss'
import backgroundImage from '../../../../assets/about-us/1.jpg'
import backgroundImage1 from '../../../../assets/fourth-section/1.webp'
import backgroundImage2 from '../../../../assets/fourth-section/2.webp'
import backgroundImage3 from '../../../../assets/fourth-section/3.webp'
import backgroundImage4 from '../../../../assets/fourth-section/4.webp'
import backgroundImage5 from '../../../../assets/fourth-section/5.webp'
import backgroundImage6 from '../../../../assets/fourth-section/6.webp'

gsap.registerPlugin(ScrollTrigger)

// Timeline data
const timelineData = [
    {
      id: 1,
      year: "2015",
      title: "Company Founded",
      description: "Our journey began with a vision to revolutionize the industry through innovative solutions Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, soluta vitae sequi qui provident, cum quia nihil molestiae placeat totam cumque neque necessitatibus! Tenetur iste, saepe ut molestias quod magnam a eveniet, explicabo praesentium architecto in. Doloribus, sint, aliquam ipsum laborum est tenetur nesciunt explicabo fugit debitis similique a porro officia eos enim impedit quam sit ut minima, voluptatem consectetur odit aperiam quos nam. Rerum dicta perferendis repellendus impedit accusamus expedita! Unde itaque ipsa mollitia perferendis explicabo optio dolorem. Ad quisquam, voluptate modi at quas in iste maiores atque laudantium inventore, eius rem laboriosam aliquid provident repudiandae, commodi recusandae nihil.",
      backgroundImage: `url(${backgroundImage})`
    },
    {
      id: 2,
      year: "2017",
      title: "First Major Project",
      description: "Successfully delivered our first large-scale project, establishing our reputation in the market Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, soluta vitae sequi qui provident, cum quia nihil molestiae placeat totam cumque neque necessitatibus! Tenetur iste, saepe ut molestias quod magnam a eveniet, explicabo praesentium architecto in. Doloribus, sint, aliquam ipsum laborum est tenetur nesciunt explicabo fugit debitis similique a porro officia eos enim impedit quam sit ut minima, voluptatem consectetur odit aperiam quos nam. Rerum dicta perferendis repellendus impedit accusamus expedita! Unde itaque ipsa mollitia perferendis explicabo optio dolorem. Ad quisquam, voluptate modi at quas in iste maiores atque laudantium inventore, eius rem laboriosam aliquid provident repudiandae, commodi recusandae nihil.",
      backgroundImage: `url(${backgroundImage1})`
    },
    {
      id: 3,
      year: "2019",
      title: "Team Expansion",
      description: "Grew our talented team to 50+ members, bringing diverse expertise and fresh perspectives Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, soluta vitae sequi qui provident, cum quia nihil molestiae placeat totam cumque neque necessitatibus! Tenetur iste, saepe ut molestias quod magnam a eveniet, explicabo praesentium architecto in. Doloribus, sint, aliquam ipsum laborum est tenetur nesciunt explicabo fugit debitis similique a porro officia eos enim impedit quam sit ut minima, voluptatem consectetur odit aperiam quos nam. Rerum dicta perferendis repellendus impedit accusamus expedita! Unde itaque ipsa mollitia perferendis explicabo optio dolorem. Ad quisquam, voluptate modi at quas in iste maiores atque laudantium inventore, eius rem laboriosam aliquid provident repudiandae, commodi recusandae nihil.",
      backgroundImage: `url(${backgroundImage2})`
    },
    {
      id: 4,
      year: "2021",
      title: "Global Recognition",
      description: "Received international awards and expanded our services to global markets Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, soluta vitae sequi qui provident, cum quia nihil molestiae placeat totam cumque neque necessitatibus! Tenetur iste, saepe ut molestias quod magnam a eveniet, explicabo praesentium architecto in. Doloribus, sint, aliquam ipsum laborum est tenetur nesciunt explicabo fugit debitis similique a porro officia eos enim impedit quam sit ut minima, voluptatem consectetur odit aperiam quos nam. Rerum dicta perferendis repellendus impedit accusamus expedita! Unde itaque ipsa mollitia perferendis explicabo optio dolorem. Ad quisquam, voluptate modi at quas in iste maiores atque laudantium inventore, eius rem laboriosam aliquid provident repudiandae, commodi recusandae nihil.",
      backgroundImage: `url(${backgroundImage3})`
    },
    {
      id: 5,
      year: "2023",
      title: "Innovation Hub",
      description: "Launched our innovation center, pushing boundaries with cutting-edge technology Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, soluta vitae sequi qui provident, cum quia nihil molestiae placeat totam cumque neque necessitatibus! Tenetur iste, saepe ut molestias quod magnam a eveniet, explicabo praesentium architecto in. Doloribus, sint, aliquam ipsum laborum est tenetur nesciunt explicabo fugit debitis similique a porro officia eos enim impedit quam sit ut minima, voluptatem consectetur odit aperiam quos nam. Rerum dicta perferendis repellendus impedit accusamus expedita! Unde itaque ipsa mollitia perferendis explicabo optio dolorem. Ad quisquam, voluptate modi at quas in iste maiores atque laudantium inventore, eius rem laboriosam aliquid provident repudiandae, commodi recusandae nihil.",
      backgroundImage: `url(${backgroundImage4})`
    },
    {
      id: 6,
      year: "2025",
      title: "Future Vision",
      description: "Continuing to innovate and lead the industry into the future with bold new initiatives Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, soluta vitae sequi qui provident, cum quia nihil molestiae placeat totam cumque neque necessitatibus! Tenetur iste, saepe ut molestias quod magnam a eveniet, explicabo praesentium architecto in. Doloribus, sint, aliquam ipsum laborum est tenetur nesciunt explicabo fugit debitis similique a porro officia eos enim impedit quam sit ut minima, voluptatem consectetur odit aperiam quos nam. Rerum dicta perferendis repellendus impedit accusamus expedita! Unde itaque ipsa mollitia perferendis explicabo optio dolorem. Ad quisquam, voluptate modi at quas in iste maiores atque laudantium inventore, eius rem laboriosam aliquid provident repudiandae, commodi recusandae nihil.",
      backgroundImage: `url(${backgroundImage5})`
    },
    {
      id: 7,
      year: "2026",
      title: "First Major Projec",
      description: "Continuing to innovate and lead the industry into the future with bold new initiatives Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, soluta vitae sequi qui provident, cum quia nihil molestiae placeat totam cumque neque necessitatibus! Tenetur iste, saepe ut molestias quod magnam a eveniet, explicabo praesentium architecto in. Doloribus, sint, aliquam ipsum laborum est tenetur nesciunt explicabo fugit debitis similique a porro officia eos enim impedit quam sit ut minima, voluptatem consectetur odit aperiam quos nam. Rerum dicta perferendis repellendus impedit accusamus expedita! Unde itaque ipsa mollitia perferendis explicabo optio dolorem. Ad quisquam, voluptate modi at quas in iste maiores atque laudantium inventore, eius rem laboriosam aliquid provident repudiandae, commodi recusandae nihil.",
      backgroundImage: `url(${backgroundImage6})`
    },
    {
      id: 8,
      year: "2027",
      title: "Company Founded",
      description: "Continuing to innovate and lead the industry into the future with bold new initiatives Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, soluta vitae sequi qui provident, cum quia nihil molestiae placeat totam cumque neque necessitatibus! Tenetur iste, saepe ut molestias quod magnam a eveniet, explicabo praesentium architecto in. Doloribus, sint, aliquam ipsum laborum est tenetur nesciunt explicabo fugit debitis similique a porro officia eos enim impedit quam sit ut minima, voluptatem consectetur odit aperiam quos nam. Rerum dicta perferendis repellendus impedit accusamus expedita! Unde itaque ipsa mollitia perferendis explicabo optio dolorem. Ad quisquam, voluptate modi at quas in iste maiores atque laudantium inventore, eius rem laboriosam aliquid provident repudiandae, commodi recusandae nihil.",
      backgroundImage: `url(${backgroundImage})`
    },
  ];

const Vertical_timeline = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineItemsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevActiveIndex, setPrevActiveIndex] = useState(0);
  const yearRefs = useRef([]);
  const backgroundRef = useRef(null);
  const [currentBgImage, setCurrentBgImage] = useState(timelineData[0]?.backgroundImage);
  const [nextBgImage, setNextBgImage] = useState(null);

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
    const scrollPerItem = 400; // 300px scroll per item
    const totalScrollDistance = totalItems * scrollPerItem;

    // Create ScrollTrigger that pins the section and controls timeline
    const timelineTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${totalScrollDistance}px`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 2, // Increased scrub for smoother animation
      invalidateOnRefresh: true, // Better performance on resize
      onUpdate: (self) => {
        const progress = self.progress;

        // Calculate which item should be active (clamp to valid range)
        const activeItemIndex = Math.min(Math.floor(progress * totalItems), totalItems - 1);

        // Update active index state
        setActiveIndex(activeItemIndex);

        // Use opacity for smoother transitions instead of display
        timelineItems.forEach((item, index) => {
          if (index === activeItemIndex) {
            gsap.to(item, {
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
              onStart: () => item.style.display = 'flex'
            });
          } else {
            gsap.to(item, {
              opacity: 0,
              duration: 0.3,
              ease: "power2.out",
              onComplete: () => item.style.display = 'none'
            });
          }
        });
      }
    });

    // Initialize year item positions
    yearRefs.current.forEach((yearItem, index) => {
      if (yearItem) {
        gsap.set(yearItem, {
          y: (index - 0) * 80,
          opacity: index === 0 ? 1 : Math.abs(index - 0) <= 1 ? 0.7 : 0.3
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Animation effect when active index changes
  useEffect(() => {
    if (prevActiveIndex !== activeIndex) {
      // Animate the previous active year out
      if (yearRefs.current[prevActiveIndex]) {
        gsap.to(yearRefs.current[prevActiveIndex], {
          scale: 1,
          y: 0,
          opacity: 0.1,
          duration: 0.4,
          ease: "power2.out"
        });
      }

      // Animate the new active year in with optimized settings
      if (yearRefs.current[activeIndex]) {
        gsap.fromTo(yearRefs.current[activeIndex],
          {
            scale: 2,
            y: 10,
            opacity: 0
          },
          {  
            scale: 2,
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out" // Changed from back.out for smoother animation
          }
        );
      }

      setPrevActiveIndex(activeIndex);
    }
  }, [activeIndex, prevActiveIndex]);

  // Smooth year items positioning animation
  useEffect(() => {
    yearRefs.current.forEach((yearItem, index) => {
      if (yearItem) {
        const targetY = (index - activeIndex) * 80;
        const isVisible = Math.abs(index - activeIndex) <= 1;
        const targetOpacity = index === activeIndex ? 1 : isVisible ? 0.7 : 0.3;

        gsap.to(yearItem, {
          y: targetY,
          opacity: targetOpacity,
          duration: 0.8,
          ease: "power2.out"
        });
      }
    });
  }, [activeIndex]);

  // Initialize first background
  useEffect(() => {
    setCurrentBgImage(timelineData[0]?.backgroundImage);
  }, []);

  // Smooth animated transition for asset images
  useEffect(() => {
    if (prevActiveIndex !== activeIndex && backgroundRef.current) {
      // Create smooth fade-in animation for new image
      gsap.fromTo(backgroundRef.current,
        {
          opacity: 0.8,
          scale: 1.05
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out"
        }
      );
      // Change asset background image
      setCurrentBgImage(timelineData[activeIndex]?.backgroundImage);
    }
  }, [activeIndex, prevActiveIndex]);

  return (
    <>
      <section className='vertical_scrolle' ref={sectionRef}>
        {/* Background Image Layer - Only this transitions */}
        <div
          className='background-image'
          ref={backgroundRef}
          style={{
            backgroundImage: currentBgImage
          }}
        ></div>

        {/* Text Overlay Layer - Always full opacity */}
        <div className='text-overlay'>
          <div className='timeline-container'>
            {/* Left Column - Years */}
            <div className='timeline-years-column'>
              {timelineData.map((item, index) => {
                // Show current, previous, next, and adjacent items for better visibility
                const isVisible = Math.abs(index - activeIndex) <= 1;
                return (
                  <div
                    key={`year-${item.id}`}
                    className={`timeline-year-item ${index === activeIndex ? 'active' : ''} ${isVisible ? 'visible' : 'hidden'}`}
                    ref={(el) => {
                      if (el && !yearRefs.current[index]) {
                        yearRefs.current[index] = el;
                        // Initialize position
                        gsap.set(el, {
                          y: (index - activeIndex) * 80,
                          opacity: index === activeIndex ? 1 : isVisible ? 0.7 : 0.3
                        });
                      }
                    }}
                  >
                    <div
                      className='timeline-year'
                      ref={(el) => {
                        if (el) yearRefs.current[index] = el;
                      }}
                    >
                      {item.year}
                    </div>
                    <div className='timeline-dot'></div>
                  </div>
                );
              })}
            </div>

            {/* Separator Line */}
            <div className='timeline-separator'></div>

            {/* Right Column - Content */}
            <div className='timeline-content-column'>
              {timelineData.map((item, index) => (
                <div
                  key={item.id}
                  className='timeline-content-wrapper'
                  ref={(el) => timelineItemsRef.current[index] = el}
                >
                  <div className='timeline-text-content'>
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