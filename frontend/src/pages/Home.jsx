import { useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PlusIcon from '../assets/PlusIcon';
import AutocompleteWithCheckbox from '../components/ AutocompleteWithCheckbox ';
import CommonDialog from '../components/CommonDialog ';
import { useQuery } from '@apollo/client';
import { GET_WALLET_BY_ID } from '../graphql/queries/wallet.query';
import WalletBalanceCard from '../components/WalletBalanceCard';
import { GET_EXPENSE_CATEGORIES } from '../graphql/queries/category.query';


const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { data, error, loading } = useQuery(GET_WALLET_BY_ID, {
    variables: { id: user?.wallet._id }
  })

  const {data: expenseCategoresData, error: expenseError, loading: expenseLoading} = useQuery(GET_EXPENSE_CATEGORIES)
  console.log("expenseCategores", expenseCategoresData);
  // add expense transaction
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: null,
    date: '',
    amount: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // Handle the form submission here, e.g., send data to an AP
    setOpen(false);
  };
  console.log("data", data);
  const categories = ['Food', 'Transportation', 'Shopping', 'Health', 'Education'];
  const categories1 = ['Food1', 'Transportation1', 'Shopping1', 'Health1', 'Education1'];
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
          onClick={handleClickOpen}
        >
          Add transaction
        </Button>
        <CommonDialog
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          title="Add Transaction"
          categories={expenseCategoresData?.getExpenseCategories || []} // Pass categories as a prop
        />
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
        <WalletBalanceCard
          headerName="Current Wallet Balance"
          balance={data?.getWalletById?.moneyLeft.toFixed(2)}
        />
        <WalletBalanceCard
          headerName="Total Period Change"
          balance={data?.getWalletById?.changeTillNow.toFixed(2)}
        />
        <WalletBalanceCard
          headerName="Total Period Expense"
          balance={data?.getWalletById?.spentSoFar.toFixed(2)}
        />
        <WalletBalanceCard
          headerName="Total Period Income"
          balance={data?.getWalletById?.moneyAddedSoFar.toFixed(2)}
        />
      </div>
      <div className="bg-white rounded-lg p-[15px] flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-sm text-gray-925">Sept 16, 2024</p>
          <p className="text-sm text-gray-550 font-bold">37000</p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
          <div className="flex py-2 flex-auto justify-between rounded-md border border-soldi border-gray-400 items-center lg:w-[45%] px-4">
            <div className="left flex items-center gap-[4px]">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content w-8 rounded-full">
                  <span className="text-xs">UI</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-gray-925 text-sm lg:text-lg font-semibold">Gift</p>
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