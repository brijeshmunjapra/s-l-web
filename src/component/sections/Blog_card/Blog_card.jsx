import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Blog_card.scss"
import images1 from "../../../assets/fourth-section/1.webp"
import images2 from "../../../assets/fourth-section/2.webp"
import images3 from "../../../assets/fourth-section/3.webp"
import images4 from "../../../assets/fourth-section/4.webp"
import images5 from "../../../assets/fourth-section/5.webp"
import images6 from "../../../assets/fourth-section/6.webp"
import images7 from "../../../assets/fourth-section/7.webp"
import images8 from "../../../assets/fourth-section/8.webp"
import images9 from "../../../assets/fourth-section/9.webp"
import images10 from "../../../assets/fourth-section/10.webp"
import images11 from "../../../assets/fourth-section/11.webp"

const Blog_card = () => {
    const navigate = useNavigate();

    const handleCardClick = (blogId) => {
        navigate(`/blog/${blogId}`);
    };

    const blogData = [
        {
            id: 1,
            image: images1,
            dates: "November 28th, 2024",
            title: "Brijesh & Radhika",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        },
        {
            id: 2,
            image: images2,
            dates: "December 15th, 2024",
            title: "Amit & Priya",
            description: "Beautiful wedding ceremony showcasing traditional rituals and modern elegance. A perfect blend of cultures and emotions."
        },
        {
            id: 3,
            image: images3,
            dates: "October 20th, 2024",
            title: "Rahul & Sneha",
            dates: "October 20th, 2024",
            title: "Rahul & Sneha",
            description: "An intimate garden wedding filled with love, laughter, and unforgettable memories that will last a lifetime."
        },
        {
            id: 4,
            image: images4,
            dates: "September 10th, 2024",
            title: "Vikram & Anjali",
            description: "A grand destination wedding combining scenic beauty with heartfelt celebrations and joyous festivities."
        },
        {
            id: 5,
            image: images5,
            dates: "August 25th, 2024",
            title: "Karan & Meera",
            description: "Elegant beach wedding with stunning sunset views, creating magical moments for family and friends."
        },
        {
            id: 6,
            image: images6,
            dates: "July 5th, 2024",
            title: "Arjun & Kavya",
            description: "Traditional ceremony with modern twists, celebrating love in all its beautiful forms and expressions."
        },
        {
            id: 7,
            image: images7,
            dates: "June 18th, 2024",
            title: "Rohit & Pooja",
            description: "Intimate mountain wedding surrounded by nature's beauty, where two hearts became one forever."
        },
        {
            id: 8,
            image: images8,
            dates: "May 12th, 2024",
            title: "Sanjay & Ritu",
            description: "Luxurious palace wedding blending royal heritage with contemporary style and sophisticated elegance."
        },
        {
            id: 9,
            image: images9,
            dates: "April 30th, 2024",
            title: "Deepak & Neha",
            description: "Charming countryside wedding celebrating love, family bonds, and the simple joys of life together."
        },
        {
            id: 10,
            image: images10,
            dates: "March 22nd, 2024",
            title: "Mohan & Sunita",
            description: "Romantic vineyard wedding with breathtaking landscapes, fine wine, and everlasting love stories."
        },
        {
            id: 11,
            image: images11,
            dates: "February 14th, 2024",
            title: "Rajesh & Kiran",
            description: "Valentine's Day wedding filled with romance, red roses, and heartfelt vows exchanged under the stars."
        },
        {
            id: 12,
            image: images1,
            dates: "January 8th, 2024",
            title: "Suresh & Lata",
            description: "Winter wonderland wedding with snow-covered landscapes and warm hearts celebrating new beginnings."
        }
    ];

    return (
        <>
            <section className="section-card">
                {blogData.map((blog) => (
                    <div key={blog.id} className="main-card" onClick={() => handleCardClick(blog.id)}>
                        <div className="card-images">
                            <img src={blog.image} alt={blog.title} />
                        </div>
                        <div className="card-data">
                            <p>{blog.dates}</p>
                            <h4>{blog.title}</h4>
                            <p className='card-description'>{blog.description}</p>
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}

export default Blog_card