import React from 'react';
import "./BlogPost.scss";
// import Blog_Marquee from '../../component/sections/BlogPost_Section/Blog_Marquee';

import img1 from '../../assets/fourth-section/1.webp';
import img2 from '../../assets/fourth-section/2.webp';
import img3 from '../../assets/fourth-section/3.webp';
import img4 from '../../assets/fourth-section/4.webp';
import img5 from '../../assets/fourth-section/5.webp';
import img6 from '../../assets/fourth-section/6.webp';

const BlogPost = () => {

    return (
        <>
            <section className="blog-post-container">
                <div className="Blog-text">
                    <span>November 28th, 2024</span>
                    <h4>Brijesh & Radhika</h4>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae exercitationem possimus porro beatae maxime perferendis atque magni assumenda illo ab deleniti officia adipisci veniam natus impedit cum sint provident eum quod aliquid, voluptate fuga voluptatem. Rerum harum aliquid voluptas officia quidem placeat commodi suscipit exercitationem omnis veritatis? Quas sit nam ratione tempora, nihil facilis quis voluptatum molestiae dicta porro nostrum, vitae officiis quibusdam unde corrupti inventore sed odit doloremque earum vel, nisi voluptatibus et id aut? Molestias dicta ratione quos nihil ullam deleniti iste odio necessitatibus corporis cupiditate rerum eveniet soluta neque similique, provident assumenda dolore? Ea optio porro unde iusto doloribus, earum quis perferendis harum molestiae nihil laboriosam voluptatibus, et ad, quasi dolores iure repellendus. Vitae quo inventore, incidunt amet praesentium ut quas, tempore enim, libero maiores eos nisi consectetur itaque tempora ipsam saepe quam provident odit possimus? Minus labore doloremque harum impedit sapiente atque sint dolorum rem error quos consequuntur, ut totam, eius facere cumque officia reprehenderit mollitia cum incidunt! Quidem tempore voluptates accusantium atque porro corporis, ullam excepturi, ipsum harum est voluptatum odio obcaecati aspernatur autem quibusdam esse fugit fugiat commodi quia. Dolorum quo asperiores ea aliquid iste quas beatae suscipit. Voluptatibus, eaque. Libero aliquid dolores possimus.</p>
                </div>
                <div className="grid">
                    <div className="Fist_images">
                        <img src={img1} alt="" />
                    </div>
                    <div className="Second_images">
                        <img src={img2} alt="" />
                        <img src={img3} alt="" />
                    </div>
                    <div className="Fist_images images_section_therd">
                        <img src={img4} alt="" />
                    </div>
                    <div className="Second_images images_section_Fourth">
                        <img src={img6} alt="" />
                        <img src={img6} alt="" />
                    </div>
                    <div className="Second_images images_section_Fifth">
                        <img src={img1} alt="" />
                        <div className="Grid_Flex">
                        <img src={img5} alt="" />
                        <img src={img3} alt="" />
                        </div>
                    </div>
                    <div className="Fist_images images_section_Sixe">
                        <img src={img4} alt="" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogPost;
