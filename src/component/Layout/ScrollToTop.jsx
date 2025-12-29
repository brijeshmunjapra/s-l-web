import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useLenis from '../../hooks/useLenis';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const { scrollTo } = useLenis();

  useEffect(() => {
    // Scroll to top whenever the route changes
    scrollTo(0, { duration: 1.2 });
  }, [pathname, scrollTo]);

  return null;
};

export default ScrollToTop;
