import "./FeedBack.scss";

import brideImg from "../../../../assets/about-us/1.jpg";
import user1 from "../../../../assets/about-us/1.jpg";
import user2 from "../../../../assets/about-us/1.jpg";
import user3 from "../../../../assets/about-us/1.jpg";
import user4 from "../../../../assets/about-us/1.jpg";


const FeedBack = () => {

  return (
    <section className="testimonials">
      <div className="container">
        {/* LEFT */}
        <div className="content">
          <span className="subtitle">
            GENTLE FRAMES, LASTING IMPRESSIONS
          </span>
          <h2 className="title">What Our Clients Say</h2>

          <div className="cards">
            <div
              className="card"
            >
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nostrum porro exercitationem libero. Nesciunt.</p>

              <div className="user">
                <img src={user1} />
                <div>
                  <h4>John Smith</h4>
                  <span>Customers</span>
                </div>
              </div>

              <span className="quote">“</span>
            </div>
            <div
              className="card"
            >
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nostrum porro exercitationem libero. Nesciunt.</p>

              <div className="user">
                <img src={user1} />
                <div>
                  <h4>John Smith</h4>
                  <span>Customers</span>
                </div>
              </div>

              <span className="quote">“</span>
            </div>
          </div>

          <div className="arrows">
            <button>←</button>
            <button>→</button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="image-box">
          <img src={brideImg} alt="Bride" />

          <div className="rating">
            <div className="stars">★★★★★</div>
            <h4>4.8 / 5 positive Ratings</h4>
            <span>Based on 500+ Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedBack;
