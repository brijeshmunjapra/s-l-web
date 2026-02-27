import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeventhSectionImages } from '../../../store/slices/seventhSectionSlice';
import "./Seventh.scss";

import Frame from "../../../assets/seventh-section/Frame.png"

const Seventh = () => {
  const dispatch = useDispatch();
  const { images, loading, error } = useSelector(state => state.seventhSection);

  useEffect(() => {
    dispatch(fetchSeventhSectionImages());
  }, [dispatch]);

  // Helper function to safely get image by index
  const getImage = (index) => {
    return images && images[index] ? images[index] : null;
  };
  return (
    <section className="seventh">
      <div className="seventh__wrapper">

        {/* LEFT IMAGE GRID */}
        <div className="seventh__grid">
          <div className="col">
            {getImage(0) && <img src={getImage(0).imageUrl} alt="" />}
            {getImage(3) && <img src={getImage(3).imageUrl} alt="" />}
          </div>

          <div className="col center">
            {getImage(1) && <img src={getImage(1).imageUrl} alt="" />}
          </div>

          <div className="col">
            {getImage(2) && <img src={getImage(2).imageUrl} alt="" />}
            {getImage(4) && <img src={getImage(4).imageUrl} alt="" />}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="seventh__content">
          <h2>JOIN OUR VISUAL JOURENY</h2>

          <p className="sub-heading">
            Every photograph is a blend of emotion, light, and storytelling
            crafted with care. Follow us to experience moments that turn into
            timeless memories.
          </p>

          <div className="seventh__social">
            <div>
              <span>INSTAGRAM</span>
              <a href="https://www.instagram.com/shadeandlight__/"target="_blank">@shadeandlightt__<span><img src={Frame} alt="" className="Frame-icon" /></span></a>
            </div>

            <div className="divider" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Seventh;
