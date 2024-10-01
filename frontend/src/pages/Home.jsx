import * as React from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PlusIcon from '../assets/PlusIcon';
import AutocompleteWithCheckbox from '../components/ AutocompleteWithCheckbox ';


const Home = () => {
  return (
    <div className="flex flex-col gap-4 flex-grow px-[16px] py-4 bg-[#F4F7FA] xl:px-[15%]">
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
          <p className="text-sm font-semibold">Filters</p>
          <p className="text-sm text-gray-450">Reset Filters</p>
        </div>
        <div className="flex flex-col w-full  lg:flex-row gap-2">
          <div className="w-full flex flex-col">
            <label className="text-sm text-gray-450 mb-1">By Category</label>
            <AutocompleteWithCheckbox />
          </div>
          <div className="w-full flex flex-col">
            <label className="text-sm text-gray-450 mb-1">By Category</label>
            <input
              type="text"
              placeholder="Type here"
              className="input border border-solid border-black w-full focus:border-black focus:outline-none"
            />
          </div>
          <div className="w-full flex flex-col">
            <label className="text-sm text-gray-450 mb-1">By Note</label>
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
      <div className="bg-white rounded-lg p-[15px] flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-sm text-gray-925">Sept 16, 2024</p>
          <p className="text-sm text-gray-550 font-bold">37000</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="left flex items-center gap-[4px]">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content w-8 rounded-full">
                  <span className="text-xs">UI</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-gray-925 text-sm leading-5">Gift</p>
                <p className="px-2 text-xs bg-gray-25 rounded-full">chip</p>
              </div>
            </div>
            <div className="right">
              <p className="text-sm font-bold text-green-app">+1200.0 USD</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="left flex items-center gap-[4px]">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content w-8 rounded-full">
                  <span className="text-xs">UI</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-gray-925 text-sm leading-5">Gift</p>
                <p className="px-2 text-xs bg-gray-25 rounded-full">chip</p>
              </div>
            </div>
            <div className="right">
              <p className="text-sm font-bold text-green-app">+1200.0 USD</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="left flex items-center gap-[4px]">
              <div className="avatar placeholder">
                <div className="bg-green text-neutral-content w-8 rounded-full">
                 <img src="school.png" alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-gray-925 text-sm leading-5">Gift</p>
                <p className="px-2 text-xs bg-gray-25 rounded-full">chip</p>
              </div>
            </div>
            <div className="right">
              <p className="text-sm font-bold text-green-app">+1200.0 USD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home