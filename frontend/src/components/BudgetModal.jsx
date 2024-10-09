import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, MenuItem, Select, FormControl, InputLabel, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const BudgetModal = ({ open, onClose, onSubmit, formData, setFormData, title, categories, currencies }) => {
  const [errors, setErrors] = useState({
    budgetName: false,
    amount: false,
    currency: false,
    categories: false,
    startDate: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event, value) => {
    console.log("value", value);
    setFormData((prev) => ({
      ...prev,
      categories: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      budgetName: !formData.budgetName,
      amount: !formData.amount || formData.amount <= 0,
      currency: !formData.currency,
      categories: !formData.categories || formData.categories.length === 0,
      startDate: !formData.startDate,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error === true);
  };

  const handleSubmit = () => {
    console.log("formData", formData);
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
          {/* Budget Name */}
          <TextField
            margin="dense"
            name="budgetName"
            label="Budget Name"
            fullWidth
            value={formData.budgetName}
            onChange={handleChange}
            error={errors.budgetName}
            helperText={errors.budgetName && 'Please enter a budget name'}
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
          
          {/* Amount */}
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

          {/* Select Currency */}
          <FormControl fullWidth margin="dense" error={errors.currency}>
            <InputLabel id="currency-label">Currency</InputLabel>
            <Select
              labelId="currency-label"
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              label="Currency"
            >
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
            {errors.currency && <p style={{ color: 'red' }}>Please select a currency</p>}
          </FormControl>

          {/* All Categories (Multiple Select with Checkboxes) */}
          <Autocomplete
            multiple
            options={categories}
            disableCloseOnSelect
            getOptionLabel={(option) => option ? `${option.name} (${option.categoryType})` : ""}
            value={formData.categories || []}
            onChange={handleCategoryChange}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {`${option.name} (${option.categoryType})`}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="All Categories"
                margin="dense"
                fullWidth
                error={errors.categories}
                helperText={errors.categories && 'Please select at least one category'}
              />
            )}
          />

          {/* Budget Period (Fixed Monthly) */}
          <TextField
            margin="dense"
            name="budgetPeriod"
            label="Budget Period"
            fullWidth
            value="Monthly Fixed"
            InputProps={{
              readOnly: true,
            }}
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

          {/* Start Date */}
          <TextField
            margin="dense"
            name="startDate"
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.startDate}
            onChange={handleChange}
            error={errors.startDate}
            helperText={errors.startDate && 'Please select a start date'}
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
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

BudgetModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  currencies: PropTypes.array.isRequired,
};

export default BudgetModal;
