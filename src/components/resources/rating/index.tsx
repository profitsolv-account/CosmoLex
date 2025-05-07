
import Star  from './star.svg';
import React from "react";

interface RatingProps {
    rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
    const maxRating = 5;
    return (
        <div className="flex items-center space-x-1">
            {[...Array(maxRating)].map((_, index) => (
                <Star
                    key={index}
                    className={`h-5 w-5 ${
                        index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                    }`}
                />
            ))}
        </div>
    );
};

export default Rating;