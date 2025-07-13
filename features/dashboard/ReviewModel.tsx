import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Rating,
} from '@mui/material';
import { IoMdStar } from 'react-icons/io';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function ReviewDialog({
  open,
  handleClose,
  type,
  reviewerId,
  productName,
  sales_id,
}: any) {
  const [rating, setRating] = useState(0); // For storing the star rating
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    rating: '',
    review: '',
    customer_name: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };
  const formatDate = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };
  const date = new Date();
  const router = useRouter();
  const handleSubmit = async () => {
    const formattedDate = formatDate(date);

    const formData1 = new FormData();
    formData1.append('done_by', reviewerId);
    formData1.append('type', 'Cust');
    formData1.append('review', formData.review);
    formData1.append('reviewed_date', formattedDate);
    formData1.append('star', rating.toString());
    formData1.append('product_name', productName || '');
    formData1.append('sales_id', sales_id);
    try {
      const response = await api.post(
        '/techsewa/publiccontrol/publicreview/CreateproductReview',
        formData1
      );
      if (response.data) {
        toast.success('Review added successfully');
        router.refresh();
      } else {
        toast.error('Failed to add review');
      }
    } catch (error) {
      toast.error('Error posting comment');
    }
    handleClose(); // Close the dialog after submission
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Submit Your Review</DialogTitle>
      <DialogContent>
        <div className="flex gap-1 my-4">
          {[...Array(5)].map((_, index) => {
            const currentRating = index + 1;
            return (
              <IoMdStar
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

        <TextField
          label="Review"
          name="review"
          multiline
          rows={4}
          fullWidth
          margin="dense"
          value={formData.review}
          onChange={handleChange}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReviewDialog;
