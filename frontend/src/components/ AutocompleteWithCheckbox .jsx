import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import { CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material';

const options = [
  { title: 'Option 1', value: 'option1' },
  { title: 'Option 2', value: 'option2' },
  { title: 'Option 3', value: 'option3' },
];

const AutocompleteWithCheckbox = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <Autocomplete
      multiple
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlank fontSize="small" />}
            checkedIcon={<CheckBox fontSize="small" />}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" placeholder="Choose" />
      )}
      value={selectedOptions}
      onChange={(event, newValue) => {
        setSelectedOptions(newValue);
      }}
    />
  );
}

export default AutocompleteWithCheckbox;
