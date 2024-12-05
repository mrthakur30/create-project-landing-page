import { ArrowLeft, ArrowRight } from 'lucide-react';
import  { useState } from 'react';

const reviews = [
  {
    name: "Ravi",
    rating: 5,
    testimonial: "The design team beautifully transformed my space! I love how it turned out."
  },
  {
    name: "Ayushi",
    rating: 5,
    testimonial: "From the very first idea to the end, they exceeded all my expectations. Now, my home feels like a dream."
  },
  {
    name: "Kritvaya",
    rating: 4.8,
    testimonial: "Their creativity and attention to details are amazing. At last, I have got my dream house."
  },
  {
    name: "Pritika",
    rating: 5,
    testimonial: "They captured my style perfectly. Everything here is so fashionable and handy."
  },
  {
    name: "Mahi",
    rating: 5,
    testimonial: "You have made me realise what I dreamt about with design Elementary and now I am totally delighted."
  }
];

const getStars = (rating :number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0; // If rating has a decimal part
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push('★');
  }

  if (halfStar) {
    stars.push('☆'); // Optional: Display a half-filled star if you want more precision
  }

  while (stars.length < 5) {
    stars.push('☆'); // Fill remaining with empty stars
  }

  return stars;
};

const CustomerReviews = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const handlePrevReview = () => {
    setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNextReview = () => {
    setCurrentReview((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      <div className="bg-green-950 h-56 w-full relative flex items-center justify-center">
        <button
          className="absolute left-0 p-5  text-black rounded-full md:mx-4 text-4xl"
          onClick={handlePrevReview}
        >
          <ArrowLeft color='yellow' size={100} />
        </button>
        
        <div className="text-center text-white md:p-3 mb-8">
          <p className="italic md:text-2xl">"{reviews[currentReview].testimonial}"</p>
          <p className="font-bold text-xl mt-3">{reviews[currentReview].name}</p>
          
          {/* Display yellow stars */}
          <div className="text-yellow-400 mt-2 text-xl">
            {getStars(reviews[currentReview].rating).map((star, index) => (
              <span key={index} className=' text-3xl md:text-7xl'>{star}</span>
            ))}
          </div>
        </div>

        <button
          className="absolute right-0 p-5  text-black rounded-full md:mx-4 text-4xl"
          onClick={handleNextReview}
        >
          <ArrowRight color='yellow' size={100} />
        </button>
      </div>
    </div>
  );
};

export default CustomerReviews;
