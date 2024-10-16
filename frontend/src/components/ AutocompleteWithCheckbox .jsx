import React from "react";
import { Autocomplete, TextField, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const AutocompleteWithCheckbox = ({ allCategories, setTransactionFilter }) => {
  // Icon for unchecked and checked checkboxes
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleChange = (event, newValue) => {
    const categorieIds = newValue.map((value) => value._id)
    setTransactionFilter((prv) => {
      return { ...prv, categoryIds: categorieIds }
    })
  };

  return (
    <Autocomplete
      multiple
      options={allCategories || []}
      disableCloseOnSelect
      getOptionLabel={(option) =>
        option ? `${option.name} (${option.categoryType})` : ""
      }
      onChange={handleChange}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name} ({option.categoryType})
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Category"
          margin="dense"
          fullWidth
          sx={{
            padding: "2px",
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
      renderTags={(value, getTagProps) => {
        // Custom tag rendering: show "+X selected" where X is the number of selected items
        if (value.length > 0) {
          return `+${value.length} categories selected`;
        }
        return null;
      }}
    />

  );
};

export default AutocompleteWithCheckbox;
