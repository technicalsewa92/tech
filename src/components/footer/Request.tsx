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
import toast from 'react-hot-toast';
import { useCallbackRequestMutation } from '@/lib/api';

function CallbackFormModal({ open, onClose }: any) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    query: '',
  });
  const [errors, setErrors] = useState({});

  // ✅ Use React Query mutation
  const callbackRequestMutation = useCallbackRequestMutation();

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

    try {
      await callbackRequestMutation.mutateAsync({
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        query: formData.query,
      });

      toast.success('Our sales team will contact you soon!');
      onClose();
    } catch (error) {
      toast.error('Failed to submit callback request');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
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
            onBlur={handleChange}
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
        <Button
          onClick={handleSubmit}
          color="primary"
          type="submit"
          disabled={callbackRequestMutation.isPending}
        >
          {callbackRequestMutation.isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CallbackFormModal;
