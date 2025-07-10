'use client';
import { baseUrl } from '@/public/baseUrl';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoMdStar } from 'react-icons/io';
import ReviewsDisplay from '@/components/ReviewsDisplay';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface ReviewItem {
  complain_id: string;
  review: string;
  rating: string;
  tech_name: string;
  tech_id: string;
  cust_id: string;
  customer_name: string;
  customer_image: string;
  tech_image: string;
}

export default function ServiceReviews({ productId }: { productId: number }) {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const getReviews = async () => {
    const formData = new FormData();
    formData.append('page', `${page}`);
    formData.append('product', `${productId}`);
    const { data } = await axios.post(
      `${baseUrl}/techsewa/publicControl/PublicComplain/getRatingDetails`,
      formData
    );
    setReviews(data?.list as ReviewItem[]);
  };
  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className="max-w-[1280px] mx-auto md:p-0 p-3">
      {/* Google Business Reviews Section */}
      <div className="mb-12">
        <ReviewsDisplay
          limit={4}
          showStats={true}
          title="Google Business Reviews"
          layout="grid"
          className=""
        />
      </div>

      {/* Customer Service Reviews */}
      <h2 className="mb-6 text-2xl font-bold">Customer Service Reviews</h2>
      <div className="flex flex-col">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 pb-20">
          {reviews?.map((review, index) => (
            <div
              key={index}
              className="flex rounded-lg mb-2 gap-2 border border-primary p-2"
            >
              <div className="flex flex-col items-center">
                <ImageWithFallback
                  className="object-cover w-14 h-14 rounded-full"
                  src={review.customer_image}
                  alt="profile"
                  width={56}
                  height={56}
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">
                  {review.customer_name}
                </h3>
                <div className="flex gap-1">
                  {[...Array(parseInt(review.rating))].map((e, i) => {
                    return (
                      <IoMdStar key={i} className="text-yellow-500 text-base" />
                    );
                  })}
                </div>
                <h3 className="text-base font-light">{review.review}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
