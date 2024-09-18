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
          sx={{ backgroundColor: '#12C48B' }}
        >
          Add transaction
        </Button>
      </div>
      <div className="p-[15px] flex flex-col gap-2 bg-[#fff] rounded-lg">
        <div className="flex justify-between">
          <p class="text-sm font-semibold">Filters</p>
          <p class="text-sm text-gray-450">Reset Filters</p>
        </div>
        <div className="flex flex-col w-full md:flex-col gap-2">
          <div className="w-full flex flex-col">
            <label class="text-sm text-gray-450 mb-1">By Category</label>
            <AutocompleteWithCheckbox />
          </div>
          <div className="w-full flex flex-col">
            <label class="text-sm text-gray-450 mb-1">By Category</label>
            <input
              type="text"
              placeholder="Type here"
              className="input border border-solid border-black w-full focus:border-black focus:outline-none"
            />
          </div>
          <div className="w-full flex flex-col">
            <label class="text-sm text-gray-450 mb-1">By Note</label>
            <input
              type="text"
              placeholder="Type here"
              className="input border border-solid border-black w-full focus:border-black focus:outline-none"
            />
          </div>
        </div>

      </div>
      <div className="flex gap-5 overflow-auto px-[-16px]">
        <div className="px-[15px] py-3 bg-white rounded-lg">
          <p className="text-[#455A65] font-semibold tracking-wide">Current Wallet Balance</p>
          <p className="text-[24px] font-semibold text-[#12C48B] tracking-wider min-w-[240px]">$ 13700000.00</p>
        </div>
        <div className="px-[15px] py-3 bg-white rounded-lg">
          <p className="text-[#455A65] font-semibold tracking-wide">Current Wallet Balance</p>
          <p className="text-[24px] font-semibold text-[#12C48B] tracking-wider min-w-[240px]">$ 13700000.00</p>
        </div>
        <div className="px-[15px] py-3 bg-white rounded-lg">
          <p className="text-[#455A65] font-semibold tracking-wide">Current Wallet Balance</p>
          <p className="text-[24px] font-semibold text-[#12C48B] tracking-wider min-w-[240px]">$ 13700000.00</p>
        </div>
      </div>
      <div className="bg-white rounded-lg p-[15px]">
        <div className="flex justify-between">
          <p class="text-sm text-gray-925">Sept 16, 2024</p>
          <p class="text-sm text-gray-550 font-bold">37000</p>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <div className="left flex items-center gap-[2px]">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content w-8 rounded-full">
                  <span className="text-xs">UI</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-925">Gift</p>
                <p>chip</p>
              </div>
            </div>
            <div className="right">
              <p>+1200.0 usd</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home