import React from 'react';

const StarRating = ({ rating, onChange, interactive = false, style }) => {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div style={{ display: 'flex', gap: '2px', ...style }}>
            {stars.map((star) => (
                <span
                    key={star}
                    onClick={() => interactive && onChange && onChange(star)}
                    style={{
                        cursor: interactive ? 'pointer' : 'default',
                        fontSize: '1.2rem',
                        color: star <= rating ? '#ffc107' : 'white', // Gold or White
                        transition: 'color 0.2s'
                    }}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
