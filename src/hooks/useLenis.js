import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

const useLenis = (options = {}) => {
  const lenisRef = useRef(null);

  // Optimized default settings for smooth scrolling performance
  const defaultOptions = {
    scrollSpeed: 0.4,     // Slightly faster for better responsiveness
    duration: 0.5,        // Shorter duration for snappier feel
    lerp: 0.08,           // Lower lerp for smoother interpolation
    maxWheelDelta: 100,   // Allow more wheel delta for natural scrolling
  };

  const config = { ...defaultOptions, ...options };

  useEffect(() => {
    // Initialize Lenis with optimized settings for performance
    lenisRef.current = new Lenis({
      duration: config.duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Optimized easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: config.scrollSpeed,
      smoothTouch: true,
      touchMultiplier: config.scrollSpeed,
      infinite: false,
      autoResize: true,
      normalizeWheel: true,
      lerp: config.lerp,
      wheelMultiplier: config.scrollSpeed,
      // Performance optimizations
      wrapper: window,
      content: document.body,
    });

    // Track scroll state to pause conflicting animations
    let isScrolling = false;
    let scrollTimeout;

    // Function to pause CSS animations during scroll
    const pauseAnimations = () => {
      if (!isScrolling) {
        isScrolling = true;
        document.body.classList.add('scrolling-active');
      }
      clearTimeout(scrollTimeout);
    };

    const resumeAnimations = () => {
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        document.body.classList.remove('scrolling-active');
      }, 100); // Resume animations 100ms after scroll stops
    };

    // Listen to Lenis scroll events
    lenisRef.current.on('scroll', () => {
      pauseAnimations();
      resumeAnimations();
    });

    // Start the Lenis instance with optimized animation loop using performance.now()
    let rafId;
    const animate = (time) => {
      lenisRef.current.raf(time);
      rafId = requestAnimationFrame(animate);
    };

    // Use requestAnimationFrame with performance.now() for better timing
    rafId = requestAnimationFrame(animate);

    // Add passive event listeners for better performance
    const handleResize = () => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup function
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      clearTimeout(scrollTimeout);
      window.removeEventListener('resize', handleResize);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, [config.duration, config.lerp, config.scrollSpeed]);

  // Provide a method to scroll to specific positions programmatically with optimized settings
  const scrollTo = useCallback((target, options = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        duration: 1.0, // Match the main duration setting
        easing: (t) => 1 - Math.pow(1 - t, 4), // Match the main easing function
        ...options,
      });
    }
  }, []);

  // Return scrollTo method
  return {
    scrollTo,
  };
};

export default useLenis;
