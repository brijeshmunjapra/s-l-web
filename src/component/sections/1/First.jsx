import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, useInView, useScroll } from "framer-motion";
import { fetchFirstSectionData } from "../../../store/slices/firstSectionSlice";
import "./First.scss";

import leftImage from "../../../assets/first-section/left.jpg";
import rightImage from "../../../assets/first-section/right.jpg";
import cornerSvg from "../../../assets/first-section/right-image-left-top-corner.svg";
import topImage from "../../../assets/first-section/top.svg";
// import { gsap } from "gsap";

const First = React.memo(() => {
  const dispatch = useDispatch();
  const { data: apiData, loading, error } = useSelector((state) => state.firstSection);
  const ref = useRef(null);
  const topImageRef = useRef(null);
  const [lastScrollDirection, setLastScrollDirection] = useState("down");
  const [hasFetched, setHasFetched] = useState(false);

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

  // Fetch first section data on component mount (only once)
  useEffect(() => {
    if (!hasFetched && !loading) {
      setHasFetched(true);
      dispatch(fetchFirstSectionData());
    }
  }, [hasFetched, loading, dispatch]);

  // Animate every time section becomes visible
  const isInView = useInView(ref, {
    margin: "-50px",
    amount: 0.1,
  });

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

  // Show loading state
  if (loading) {
    return (
      <div ref={ref} className="first-section">
        <div className="loading-state">Loading...</div>
      </div>
    );
  }

  // If there's an error, continue rendering with static fallback data instead of showing error

  return (
    <div ref={ref} className="first-section">
      <motion.div
        className="first-section-left"
        variants={imageVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <img src={apiData?.leftImageUrl || leftImage} alt="Left" />
      </motion.div>

      <motion.div
        className="first-section-top"
        variants={imageVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="top-content">
          <img ref={topImageRef} src={topImage} alt="Top" />
        </div>
      </motion.div>

      <div className="first-section-middle">
        <div className="middle-content">
          {apiData?.description ? (
            apiData.description.split('\n\n').map((paragraph, index) => (
              <div key={index} className={index === 2 ? "specificati" : ""}>
                {paragraph}
              </div>
            ))
          ) : (
            <>
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
                captured. We don't just document weddings. We create art that lives
                on.
              </div>
            </>
          )}
        </div>
      </div>

      <motion.div
        className="first-section-right"
        variants={imageVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="right-image-wrapper">
          <img src={apiData?.rightImageUrl || rightImage} alt="Right" />
          <motion.div
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
