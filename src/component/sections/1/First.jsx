import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import "./First.scss";
import leftImage from "../../../assets/first-section/left.jpg";
import rightImage from "../../../assets/first-section/right.jpg";
import cornerSvg from "../../../assets/first-section/right-image-left-top-corner.svg";
import topImage from "../../../assets/first-section/top.svg";
import { gsap } from "gsap";

const First = forwardRef((props, ref) => {
  const sectionRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const topImageRef = useRef(null);
  const timelineRef = useRef(null);

  useImperativeHandle(ref, () => ({
    playAnimation: () => {
      if (timelineRef.current) {
        timelineRef.current.restart();
      }
    }
  }));

  useEffect(() => {
    // Set initial states for all images
    gsap.set([leftImageRef.current, rightImageRef.current, topImageRef.current], {
      opacity: 0,
      y: 100, // Start from bottom
      scale: 0.8
    });

    // Create a timeline for coordinated animations (paused initially)
    timelineRef.current = gsap.timeline({ paused: true });

    // Add animations to the timeline with slight delays for staggered effect
    timelineRef.current
      .to(topImageRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      })
      .to(leftImageRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out"
      }, "-=0.8") // Start 0.2s before top animation ends
      .to(rightImageRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out"
      }, "-=0.8"); // Start at the same time as left image

  }, []);

  return (
    <div ref={sectionRef} className="first-section">
      <div className="first-section-left">
        <img ref={leftImageRef} src={leftImage} alt="Left" />
      </div>
      <div className="first-section-top">
        <div className="top-content">
          <img ref={topImageRef} src={topImage} alt="Top" />
        </div>
      </div>
      <div className="first-section-middle">
        <div className="middle-content">
          <div>
            Recognised as a leading voice in modern wedding photography and
            filmmaking, Shade & Light has spent years shaping a visual style
            that blends emotion, artistry, and cinematic elegance
          </div>
          <div>
            Our long-standing journey has given us the privilege of creating
            photographs and films that become treasured heirlooms crafted with
            intention, depth, and heart.
          </div>
          <div>
            {
              "With a trusted legacy and a distinct creative vision, Shade & Light continues to reimagine how love, culture, and celebration are captured.\nWe don’t just document weddings.\nWe create art that lives on."
            }
          </div>
        </div>
      </div>
      <div className="first-section-right">
        <div className="right-image-wrapper">
          <img ref={rightImageRef} src={rightImage} alt="Right" />
          <img src={cornerSvg} alt="Corner decoration" className="corner-svg" />
        </div>
      </div>
    </div>
  );
});

export default First;
