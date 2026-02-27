import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Blog_card.scss"

const Blog_card = ({ couples, loading, error }) => {
    const navigate = useNavigate();

    const handleCardClick = (couple) => {
        navigate(`/blog/${couple.id}`);
    };

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

    if (loading) {
        return <div className="loading">Loading couples...</div>;
    }

    if (error) {
        return <div className="error">Error loading couples: {error}</div>;
    }

    if (!couples || couples.length === 0) {
        return <div className="no-data">No couples data available</div>;
    }

    return (
        <section className="section-card">
            {couples.map((couple) => (
                <div key={couple.id} className="main-card" onClick={() => handleCardClick(couple)}>
                    <div className="card-images">
                        {/* Display only the first active image for the card */}
                        {couple.images && couple.images.length > 0 && (
                            <img src={couple.images[0].imageUrl} alt={couple.coupleName} />
                        )}
                    </div>
                        <div className="card-data">
                            <p>{formatDate(couple.date)}</p>
                            <h4>{couple.coupleName}</h4>
                            <p className='card-description'>{couple.shortDescription}</p>
                        </div>
                </div>
            ))}
        </section>
    )
}
export default Blog_card