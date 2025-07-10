import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { AxiosCorsInstance } from '@/axios_config/Axios';
import toast from 'react-hot-toast';
import axios from 'axios';

function CallbackFormModal({ open, onClose }: any) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    query: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === 'mobile' && value && !/^\d{10}$/.test(value)) {
      setErrors(prev => ({ ...prev, mobile: 'Invalid mobile number' }));
    } else {
      setErrors(prev => ({ ...prev, mobile: '' }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Handle form submission
    try {
      const data = new FormData();
      data.append('cust_name', formData.name);
      data.append('cust_mobile', formData.mobile);
      data.append('cust_email', formData.email);
      data.append('cust_query', formData.query);
      const response = await axios.post(
        'https://www.technicalsewa.com/techsewa/publiccontrol/publicreview/getcallbackrequest',
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } } // Try removing this line or setting Content-Type as needed
      );
      if (response.status === 200) {
        toast.success('Our sales team will contact you soon!');
        // window.location.reload()
      }
    } catch (error) {
      toast.error('Failed to submit callback request');
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs" // Decreased maxWidth to "xs"
      sx={{ '& .MuiDialog-paper': { width: '90%', maxWidth: '400px' } }}
    >
      <DialogTitle>Request a Callback</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2" color="textSecondary" paragraph>
          Fill out the form below and we&apos;ll get back to you as soon as
          possible.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Mobile"
            id="mobile"
            type="text"
            value={formData.mobile}
            onChange={handleChange}
            onBlur={handleChange} // Validation on blur
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Query Details"
            id="query"
            multiline
            minRows={4}
            value={formData.query}
            onChange={handleChange}
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" type="submit">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CallbackFormModal;
