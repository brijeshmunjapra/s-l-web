import { useState, useRef, useEffect } from "react";
import "./FeedBack.scss";

import brideImg from "../../../../assets/about-us/1.jpg";
import user1 from "../../../../assets/about-us/1.jpg";
import user2 from "../../../../assets/about-us/1.jpg";
import user3 from "../../../../assets/about-us/1.jpg";
import user4 from "../../../../assets/about-us/1.jpg";

const data = [
  {
    text:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    name: "Sally Watson",
    role: "Customers",
    avatar: user1,
  },
  {
    text:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    name: "John Smith",
    role: "Customers",
    avatar: user2,
  },
  {
    text:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    name: "John Smith",
    role: "Customers",
    avatar: user2,
  },
  {
    text:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    name: "John Smith",
    role: "Customers",
    avatar: user2,
  },
  {
    text:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    name: "John Smith",
    role: "Customers",
    avatar: user2,
  },
];

const FeedBack = () => {
  const [index, setIndex] = useState(0);
  const cardRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(378); // default fallback

  useEffect(() => {
    const updateCardWidth = () => {
      if (cardRef.current) {
        const card = cardRef.current;
        const computedStyle = window.getComputedStyle(card);
        const width = card.offsetWidth;
        const marginRight = parseFloat(computedStyle.marginRight) || 0;
        setCardWidth(width + marginRight);
      }
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);

    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  const next = () => setIndex((i) => (i + 1) % data.length);
  const prev = () => setIndex((i) => (i - 1 + data.length) % data.length);

  return (
    <section className="testimonials">
      <div className="container">
        {/* LEFT */}
        <div className="content">
          <span className="subtitle">
            GENTLE FRAMES, LASTING IMPRESSIONS
          </span>
          <h2 className="title">What Our Clients Say</h2>

          <div className="cards" style={{ transform: `translateX(-${index * cardWidth}px)` }}>
            {data.map((item, i) => (
              <div
                ref={i === 0 ? cardRef : null}
                className={`card ${i === index ? "active" : ""}`}
                key={i}
              >
                <p>{item.text}</p>

                <div className="user">
                  <img src={item.avatar} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <span>{item.role}</span>
                  </div>
                </div>

                <span className="quote">“</span>
              </div>
            ))}
          </div>

          <div className="arrows">
            <button onClick={prev}>←</button>
            <button onClick={next}>→</button>
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

          <div className="avatars">
            <img src={user1} alt="" />
            <img src={user2} alt="" />
            <img src={user3} alt="" />
            <img src={user4} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedBack;
