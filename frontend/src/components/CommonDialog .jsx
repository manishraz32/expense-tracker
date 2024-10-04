import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/material';

const CommonDialog = ({ open, onClose, onSubmit, formData, setFormData, title, categories }) => {
  // State to track errors
  const [errors, setErrors] = useState({
    category: false,
    date: false,
    amount: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event, value) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {
      category: !formData.category, // True if category is empty
      date: !formData.date, // True if date is empty
      amount: !formData.amount || formData.amount <= 0, // True if amount is empty or <= 0
    };
    setErrors(newErrors);

    // Return false if any errors exist
    return !Object.values(newErrors).some((error) => error === true);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(); 
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '10px',
          padding: '10px',
          boxShadow: 'none',
          border: '1px solid #e0e0e0',
        },
      }}
    >
      <DialogTitle
        id="form-dialog-title"
        sx={{
          textAlign: 'center',
          fontSize: '1.25rem',
          fontWeight: '500',
          color: '#333',
          paddingBottom: '8px',
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          paddingBottom: '10px',
          paddingTop: '0px',
        }}
      >
        <Box component="form">
          {/* Autocomplete with validation */}
          <Autocomplete
            options={categories}
            getOptionLabel={(option) => option ? `${option.name} (${option.categoryType})` : ""} // Handle undefined option
            value={formData?.category || null} // Default to null if category is undefined
            onChange={handleCategoryChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                margin="dense"
                fullWidth
                error={errors.category}
                helperText={errors.category && 'Please select a category'}
                sx={{
                  '& label': { color: '#555' },
                  '& .MuiInputBase-input': { color: '#333' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#dcdcdc' },
                    '&:hover fieldset': { borderColor: '#b3b3b3' },
                    '&.Mui-focused fieldset': { borderColor: '#888' },
                  },
                }}
              />
            )}
          />


          {/* Date field with validation */}
          <TextField
            margin="dense"
            name="date"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.date}
            onChange={handleChange}
            error={errors.date}
            helperText={errors.date && 'Please select a date'}
            sx={{
              '& label': { color: '#555' },
              '& .MuiInputBase-input': { color: '#333' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#dcdcdc' },
                '&:hover fieldset': { borderColor: '#b3b3b3' },
                '&.Mui-focused fieldset': { borderColor: '#888' },
              },
            }}
          />
          {/* Amount field with validation */}
          <TextField
            margin="dense"
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            value={formData.amount}
            onChange={handleChange}
            error={errors.amount}
            helperText={errors.amount && 'Please enter a valid amount'}
            sx={{
              '& label': { color: '#555' },
              '& .MuiInputBase-input': { color: '#333' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#dcdcdc' },
                '&:hover fieldset': { borderColor: '#b3b3b3' },
                '&.Mui-focused fieldset': { borderColor: '#888' },
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'space-between',
          paddingTop: '10px',
          paddingRight: '20px',
          paddingLeft: '20px',
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            color: '#555',
            padding: '6px 16px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            textTransform: 'none',
            fontWeight: '400',
            '&:hover': {
              backgroundColor: '#f9f9f9',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            padding: '6px 16px',
            borderRadius: '6px',
            textTransform: 'none',
            fontWeight: '500',
            '&:hover': {
              backgroundColor: '#1663b0',
            },
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CommonDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
};

export default CommonDialog;
