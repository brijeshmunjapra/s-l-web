import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchHowWeStartedData } from '../../../../store/slices/howWeStartedSlice';
import "./HowWeStarted.scss";
import OurStory from "../../../../assets/about-us/our-story.svg";

const HowWeStarted = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.howWeStarted);

  useEffect(() => {
    dispatch(fetchHowWeStartedData());
  }, [dispatch]);
  // Don't render anything if data is not active or still loading
  if (loading || !data) {
    return null;
  }

  return (
    <div className="how-we-started-container">
      <div className="how-we-started-content">
        <div className="how-we-started-left">
          <img src={OurStory} alt="Our Story" />
          <div className="how-we-started-left-content">
            <div>
              {data.description}
            </div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="how-we-started-right">
          <img src={data.imageUrl} alt="Banner" />
        </div>
      </div>
    </div>
  );
};

export default HowWeStarted;
