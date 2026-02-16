import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Blog.scss";
import Blog_card from "../../component/sections/Blog_card/Blog_card";
import { fetchBlogPageContent } from "../../store/slices/blogPageSlice";
import { fetchBlogCouples } from "../../store/slices/blogCouplesSlice";

const Blog = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.blogPage);
  const { couples, loading: couplesLoading, error: couplesError } = useSelector((state) => state.blogCouples);

  useEffect(() => {
    dispatch(fetchBlogPageContent());
    dispatch(fetchBlogCouples());
  }, [dispatch]);

  return (
    <section className="blog">
      <div className="flex flex-Blog">
        <div className="grid-5 grid-5-Blog">
          <h2>{loading ? 'Loading...' : data?.data?.[0]?.content?.heading || 'Our Blog'}</h2>
        </div>
        <div className="grid-5">
          {error && <p className='error-text'>Error: {error}</p>}
          <p className='Gallery-text'>
            {loading ? 'Loading content...' : data?.data?.[0]?.content?.paragraphs?.join(' ') || 'When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'}
          </p>
        </div>
      </div>
      <Blog_card couples={couples} loading={couplesLoading} error={couplesError} />
    </section>
  );
};

export default Blog;
