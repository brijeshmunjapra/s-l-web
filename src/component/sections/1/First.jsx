import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll } from "framer-motion";
import "./First.scss";

import leftImage from "../../../assets/first-section/left.jpg";
import rightImage from "../../../assets/first-section/right.jpg";
import cornerSvg from "../../../assets/first-section/right-image-left-top-corner.svg";
import topImage from "../../../assets/first-section/top.svg";

const First = React.memo(() => {
  const ref = useRef(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [lastScrollDirection, setLastScrollDirection] = useState("down");

  // Track scroll direction
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = scrollY.get();
      const direction = currentScrollY > lastScrollY ? "down" : "up";
      setLastScrollDirection(direction);
      setLastScrollY(currentScrollY);
    };

    const unsubscribe = scrollY.on("change", updateScrollDirection);
    return unsubscribe;
  }, [scrollY, lastScrollY]);

  // Animate every time section becomes visible
  const isInView = useInView(ref, {
    margin: "-50px",
    amount: 0.1,
  });

  // Trigger new animation when section becomes visible
  useEffect(() => {
    if (isInView) {
      setAnimationKey(prev => prev + 1);
    }
  }, [isInView]);

  // Dynamic variants based on scroll direction
  const imageVariants = {
    hidden: {
      y: lastScrollDirection === "down" ? 60 : -60,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const cornerVariants = {
    hidden: {
      y: lastScrollDirection === "down" ? -60 : 60,
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div ref={ref} className="first-section">
      <motion.div
        key={`left-${animationKey}`}
        className="first-section-left"
        variants={imageVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <img src={leftImage} alt="Left" />
      </motion.div>

      <motion.div
        key={`top-${animationKey}`}
        className="first-section-top"
        variants={imageVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="top-content">
          <img src={topImage} alt="Top" />
        </div>
      </motion.div>

      <div className="first-section-middle">
        <div className="middle-content">
          <div>
            Recognised as a leading voice in modern wedding photography and
            filmmaking, Shade & Light has spent years shaping a visual style that
            blends emotion, artistry, and cinematic elegance
          </div>
          <div>
            Our long-standing journey has given us the privilege of creating
            photographs and films that become treasured heirlooms crafted with
            intention, depth, and heart.
          </div>
          <div className="specificati">
            With a trusted legacy and a distinct creative vision, Shade & Light
            continues to reimagine how love, culture, and celebration are
            captured. We don’t just document weddings. We create art that lives
            on.
          </div>
        </div>
      </div>

      <motion.div
        key={`right-${animationKey}`}
        className="first-section-right"
        variants={imageVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="right-image-wrapper">
          <img src={rightImage} alt="Right" />
          <motion.div
            key={`corner-${animationKey}`}
            className="corner-svg"
            variants={cornerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <img src={cornerSvg} alt="Corner" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
});

export default First;
