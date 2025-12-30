import React from 'react';
import "./BlogPost.scss";
import Blog_Marquee from '../../component/sections/BlogPost_Section/Blog_Marquee';

const BlogPost = () => {

    return (
        <>
            <section className="blog-post-container">
                <div className="Blog-text">
                    <span>November 28th, 2024</span>
                    <h4>Brijesh & Radhika</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, in enim id odio omnis, voluptates consequuntur illum doloribus quis, facere odit quaerat fugit autem quam nesciunt facilis placeat quasi voluptate.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, in enim id odio omnis, voluptates consequuntur illum doloribus quis, facere odit quaerat fugit autem quam nesciunt facilis placeat quasi voluptate.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, in enim id odio omnis, voluptates consequuntur illum doloribus quis, facere odit quaerat fugit autem quam nesciunt facilis placeat quasi voluptate.</p>
                </div>
                <Blog_Marquee/>
            </section>
        </>
    );
};

export default BlogPost;
