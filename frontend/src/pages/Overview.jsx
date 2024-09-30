import { useState } from 'react'
import Button from '@mui/material/Button';
import PlusIcon from '../assets/PlusIcon';
import AutocompleteWithCheckbox from '../components/ AutocompleteWithCheckbox ';
import AccountBalanceChart from '../components/AccountBalanceChart';
import MoneyChangesChart from '../components/MoneyChangesChart';
import IncomeChart from '../components/IncomeChart';
import ExpenceChart from '../components/ExpenceChart';

const Overview = () => {
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
          <p class="text-sm font-semibold">Filters</p>
          <p class="text-sm text-gray-450">Reset Filters</p>
        </div>
        <div className="flex flex-col w-full  lg:flex-row gap-2">
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
      <div className="flex flex-col gap-2">
        <div className="w-full h-[400px] bg-[#fff] rounded-lg">
           <AccountBalanceChart />
         </div>
         <div className="w-full h-[400px] bg-[#fff] rounded-lg">
           <MoneyChangesChart />
         </div>
         <div className="w-full h-[400px] bg-[#fff] rounded-lg">
           <IncomeChart />
         </div>
         <div className="w-full h-[400px] bg-[#fff] rounded-lg">
           <ExpenceChart />
         </div>
      </div>
    </div>
  )
}

export default Overview;