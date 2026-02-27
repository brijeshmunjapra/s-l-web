import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "./BlogPost.scss";
// import Blog_Marquee from '../../component/sections/BlogPost_Section/Blog_Marquee';
import { fetchBlogCouples } from '../../store/slices/blogCouplesSlice';

const BlogPost = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { couples, loading, error } = useSelector((state) => state.blogCouples);

    useEffect(() => {
        if (couples.length === 0) {
            dispatch(fetchBlogCouples());
        }
    }, [dispatch, couples.length]);

    // Format date function (same as Blog_card)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('en-US', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();

        // Add ordinal suffix to day
        const getOrdinalSuffix = (day) => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };

        return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
    };

    // Find the correct couple based on ID
    const currentCouple = useMemo(() => {
        return couples.find(couple => couple.id.toString() === id);
    }, [couples, id]);

    // Sort images by position
    const sortedImages = useMemo(() => {
        if (!currentCouple?.images) return [];
        return [...currentCouple.images].sort((a, b) => (a.position || 0) - (b.position || 0));
    }, [currentCouple]);

    // Loading state
    if (loading) {
        return (
            <section className="blog-post-container">
                <div className="Blog-text">
                    <h4>Loading...</h4>
                </div>
            </section>
        );
    }

    // Error state
    if (error) {
        return (
            <section className="blog-post-container">
                <div className="Blog-text">
                    <h4>Error loading blog post</h4>
                    <p>{error}</p>
                </div>
            </section>
        );
    }

    // Not found state
    if (!currentCouple) {
        return (
            <section className="blog-post-container">
                <div className="Blog-text">
                    <h4>Blog post not found</h4>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="blog-post-container">
                <div className="Blog-text">
                    <span>{formatDate(currentCouple.date)}</span>
                    <h4>{currentCouple.coupleName}</h4>
                    <p>{currentCouple.longDescription}</p>
                </div>
                <div className="grid">
                    {sortedImages.length > 0 && (
                        <div className="Fist_images">
                            <img
                                src={sortedImages[0]?.imageUrl}
                                alt={sortedImages[0]?.altText || ""}
                                loading="lazy"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </div>
                    )}
                    {sortedImages.length > 1 && (
                        <div className="Second_images">
                            <img
                                src={sortedImages[1]?.imageUrl}
                                alt={sortedImages[1]?.altText || ""}
                                loading="lazy"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                            {sortedImages.length > 2 && (
                                <img
                                    src={sortedImages[2]?.imageUrl}
                                    alt={sortedImages[2]?.altText || ""}
                                    loading="lazy"
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                            )}
                        </div>
                    )}
                    {sortedImages.length > 3 && (
                        <div className="Fist_images images_section_therd">
                            <img
                                src={sortedImages[3]?.imageUrl}
                                alt={sortedImages[3]?.altText || ""}
                                loading="lazy"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </div>
                    )}
                    {sortedImages.length > 4 && (
                        <div className="Second_images images_section_Fourth">
                            <img
                                src={sortedImages[4]?.imageUrl}
                                alt={sortedImages[4]?.altText || ""}
                                loading="lazy"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                            {sortedImages.length > 5 && (
                                <img
                                    src={sortedImages[5]?.imageUrl}
                                    alt={sortedImages[5]?.altText || ""}
                                    loading="lazy"
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                            )}
                        </div>
                    )}
                    {sortedImages.length > 6 && (
                        <div className="Second_images images_section_Fifth">
                            <img
                                src={sortedImages[6]?.imageUrl}
                                alt={sortedImages[6]?.altText || ""}
                                loading="lazy"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                            <div className="Grid_Flex">
                                {sortedImages.length > 7 && (
                                    <img
                                        src={sortedImages[7]?.imageUrl}
                                        alt={sortedImages[7]?.altText || ""}
                                        loading="lazy"
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                )}
                                {sortedImages.length > 8 && (
                                    <img
                                        src={sortedImages[8]?.imageUrl}
                                        alt={sortedImages[8]?.altText || ""}
                                        loading="lazy"
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                    {sortedImages.length > 9 && (
                        <div className="Fist_images images_section_Sixe">
                            <img
                                src={sortedImages[9]?.imageUrl}
                                alt={sortedImages[9]?.altText || ""}
                                loading="lazy"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default BlogPost;
