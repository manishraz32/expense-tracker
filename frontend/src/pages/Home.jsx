import * as React from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PlusIcon from '../assets/PlusIcon';
import AutocompleteWithCheckbox from '../components/ AutocompleteWithCheckbox ';


const Home = () => {
  return (
    <>
      <div>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<PlusIcon />}
          sx={{backgroundColor: '#12C48B'}}
        >
          Add transaction
        </Button>
      </div>
      <div className="p-[15px] flex flex-col gap-2 bg-[#fff] rounded-lg">
        <div className="flex justify-between">
          <p>Filters</p>
          <p>Reset Filters</p>
        </div>
        <div className="flex">
          <div className="">
            <label>By Categorey</label>
            <AutocompleteWithCheckbox />
          </div>
          <div className="">
            <label>By Categorey</label>
            <input 
              type="text" 
              placeholder="Type here" 
              className="input border border-solid border-black w-full focus:border-black focus:outline-none max-w-xs" 
            />
          </div>
          <div className="">
            <label>By Note</label>
            <input 
              type="text" 
              placeholder="Type here" 
              className="input border border-solid border-black w-full focus:border-black focus:outline-none max-w-xs" 
            />
          </div>
        </div>
      </div>
      <div className="flex ">
        <div className="px-[15px] py-3 bg-white rounded-lg">
          <p className="text-[#455A65] font-semibold tracking-wide">Current Wallet Balance</p>
          <p className="text-[24px] font-semibold text-[#12C48B] tracking-wider min-w-[240px]">$ 13700000.00</p>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <p>Sept 16, 2024</p>
          <p>37000</p>
        </div>
        <div></div>
      </div>
    </>
  )
}

export default Home