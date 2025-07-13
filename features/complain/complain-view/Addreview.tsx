import { api } from '@/lib/api';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Star } from 'lucide-react';

const ReviewForm = ({ complainId }: any) => {
  const [rating, setRating] = useState(0); // For storing the star rating
  const [hoverRating, setHoverRating] = useState(0); // For handling hover state
  const [review, setReview] = useState(''); // For storing the review text

  // Submit handler (You can replace it with an actual API call)
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (rating && review) {
      //
      const fdata = new FormData();
      fdata.append('complain_id', `${complainId}`);
      fdata.append('rating', `${rating}`);
      fdata.append('comment', `${review}`);

      const response = await api.post(
        '/techsewa/publiccontrol/publiccomplain/rateTechnician',
        fdata
      );

      if (response.status === 200) {
        toast.success('Added Successfully');
      }

      alert(`Review Submitted! \nRating: ${rating} stars \nReview: ${review}`);
      setRating(0);
      setReview('');
    } else {
      alert('Please provide both a rating and a review.');
    }
  };

  return (
    <div className="w-full mx-auto mt-4 ">
      {/* Star Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, index) => {
          const currentRating = index + 1;
          return (
            <Star
              key={index}
              className={`cursor-pointer text-2xl ${
                currentRating <= (hoverRating || rating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
              onClick={() => setRating(currentRating)}
              onMouseEnter={() => setHoverRating(currentRating)}
              onMouseLeave={() => setHoverRating(0)}
            />
          );
        })}
      </div>

      {/* Review Input */}
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-4"
        rows={4}
        placeholder="Write your review here..."
        value={review}
        onChange={e => setReview(e.target.value)}
      ></textarea>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Submit Review
      </button>
    </div>
  );
};

export default ReviewForm;
