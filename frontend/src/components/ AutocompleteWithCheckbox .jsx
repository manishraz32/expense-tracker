import React from "react";
import { Autocomplete, TextField, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const AutocompleteWithCheckbox  = ({ allCategories }) => {
  // Icon for unchecked and checked checkboxes
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <Autocomplete
      multiple // Enable multiple selection
      options={allCategories}
      disableCloseOnSelect // Prevent dropdown from closing after selecting an option
      getOptionLabel={(option) =>
        option ? `${option.name} (${option.categoryType})` : ""
      }
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
  );
};

export default AutocompleteWithCheckbox ;
