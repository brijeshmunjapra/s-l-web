import React from "react";
import "./Blog.scss";

const Blog = () => {
  return (
    <section className="blog">
    <div className="flex">
          <div className="grid-5">
            <h2>Our Blog</h2>
          </div>
          <div className="grid-5">
            <p className='Gallery-text'>When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
          </div>
        </div>
    </section>
  );
};

export default Blog;
