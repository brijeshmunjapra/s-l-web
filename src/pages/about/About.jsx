import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./About.scss";
import HowWeStarted from "../../component/sections/about-us/how-we-started/HowWeStarted";
import FeedBack from "../../component/sections/about-us/feedback/FeedBack";
import Vertical_timeline from "../../component/sections/about-us/Vertical_timeline/Vertical_timeline";
import Award from "../../component/sections/Award/Award";
import { fetchAboutPageContent } from "../../store/slices/aboutPageSlice";

const About = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.aboutPage);

  useEffect(() => {
    dispatch(fetchAboutPageContent());
  }, [dispatch]);

  return (
    <div className="about-page">
      <div className="flex ">
        <div className="grid-5">
          <h2>{loading ? 'Loading...' : data?.data?.[0]?.content?.heading || 'About Us'}</h2>
        </div>
        <div className="grid-5">
          {error && <p className='error-text'>Error: {error}</p>}
          <p className='Gallery-text'>
            {loading ? 'Loading content...' : data?.data?.[0]?.content?.paragraphs?.join(' ') || 'When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'}
          </p>
        </div>
      </div>
      <div className="about-image">
        <video className="video" src="https://event-pdf-crm.s3.ap-south-1.amazonaws.com/wesite-images/V%26V+INSTA+STORY+2.mp4" alt="About Us" autoPlay muted loop />
      </div>
      <HowWeStarted />
      <FeedBack />
      <Vertical_timeline/>
      <Award/>
    </div>
  );
};

export default About;
