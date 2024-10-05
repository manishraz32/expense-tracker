import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PlusIcon from '../assets/PlusIcon';
import AutocompleteWithCheckbox from '../components/ AutocompleteWithCheckbox ';
import CommonDialog from '../components/CommonDialog ';
import { useMutation, useQuery } from '@apollo/client';
import { GET_WALLET_BY_ID } from '../graphql/queries/wallet.query';
import WalletBalanceCard from '../components/WalletBalanceCard';
import { GET_CATEGORIES, GET_EXPENSE_CATEGORIES, GET_INCOME_CATEGORIES } from '../graphql/queries/category.query';
import { GET_TRANSACTIONS } from '../graphql/queries/transaction.query';
import { ADD_EXPENCE_TRANSACTION } from '../graphql/mutations/transaction.mutation';
import toast from 'react-hot-toast'
import PriceSlider from '../components/PriceSlider';
import { Autocomplete, TextField } from '@mui/material';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [transactionFilter, setTransactionFilter] = useState({
    categoryIds: [],
    maxAmount: null,
    minAmount: null
  })
  // Query
  const { data, error, loading } = useQuery(GET_WALLET_BY_ID, {
    variables: { id: user?.wallet?._id }
  })
  const { data: expenseCategoresData, error: expenseError, loading: expenseLoading } = useQuery(GET_EXPENSE_CATEGORIES)
  const { data: incomeCategoriesData, error: incomeError, loading: loadingError } = useQuery(GET_INCOME_CATEGORIES);
  const { data: allCategories, error: categoriesError, loading: categoriesLoader } = useQuery(GET_CATEGORIES);


  const { data: transactionData, error: transactionError, loading: transactionLoading, refetch } = useQuery(GET_TRANSACTIONS, {
    variables: {
      filter: transactionFilter
    },
    fetchPolicy: "no-cache" 
  });

  useEffect(() => {
    refetch({ filter: transactionFilter });
}, [transactionFilter, refetch]);

  console.log("income categories", incomeCategoriesData);

  // muatation 
  const [createTransaction, { loading: createTransLoading }] = useMutation(ADD_EXPENCE_TRANSACTION, {
    refetchQueries: [
      GET_WALLET_BY_ID,
      GET_TRANSACTIONS
    ],
  });

  console.log("transactionData", transactionData);

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

  const handleSubmit = async () => {
    console.log("formData", formData);
    try {
      await createTransaction({
        variables: {
          input: {
            transactionType: "EXPENSE",
            categoryId: formData.category._id,
            transactionDate: formData.date,
            amount: parseFloat(formData.amount),
            userId: user._id,
            walletId: user?.wallet?._id
          }
        }
      })
      toast.success("Transaction successfully completed");
    } catch (error) {
      console.log("error", error);
    }
    setOpen(false);
  };


  // Income modal handler

  const [incomeModalopen, setIncomeModalOpen] = useState(false);
  const [incomeFormData, setIncomeFormData] = useState({
    category: null,
    date: '',
    amount: '',
  });

  const handleClickIncomeModalOpen = () => {
    setIncomeModalOpen(true);
  };

  const handleIncomeModalClose = () => {
    setIncomeModalOpen(false);
  };

  const handleIncomeSubmit = async () => {
    console.log("formData", incomeFormData);
    try {
      await createTransaction({
        variables: {
          input: {
            transactionType: "INCOME",
            categoryId: incomeFormData.category._id,
            transactionDate: incomeFormData.date,
            amount: parseFloat(incomeFormData.amount),
            userId: user._id,
            walletId: user?.wallet?._id
          }
        }
      })
      toast.success("Transaction successfully completed");
    } catch (error) {
      console.log("error", error);
    }
    setIncomeModalOpen(false);
  };







  console.log("data", data);
  const categories = ['Food', 'Transportation', 'Shopping', 'Health', 'Education'];
  const categories1 = ['Food1', 'Transportation1', 'Shopping1', 'Health1', 'Education1'];
  return (
    <div className="flex flex-col gap-4 flex-grow px-[16px] py-4 bg-[#F4F7FA] xl:px-[15%]">
      <div className="flex flex-col gap-4 lg:flex-row">
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<PlusIcon />}
          sx={{ backgroundColor: '#2dba75' }}
          onClick={handleClickIncomeModalOpen}
        >
          Add Income Transaction
        </Button>

        <CommonDialog
          open={incomeModalopen}
          onClose={handleIncomeModalClose}
          onSubmit={handleIncomeSubmit}
          formData={incomeFormData}
          setFormData={setIncomeFormData}
          title="Add Income Transaction"
          categories={incomeCategoriesData?.getIncomeCatogries || []} // Pass categories as a prop
        />

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<PlusIcon />}
          sx={{ backgroundColor: '#f14c52' }}
          onClick={handleClickOpen}
        >
          Add Expense Transaction
        </Button>


        <CommonDialog
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          title="Add Expense Transaction"
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
            <AutocompleteWithCheckbox 
              allCategories={allCategories?.getCategories || []}
            />
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
            <label className="text-sm text-gray-450 mb-1">By amount</label>
            <PriceSlider />
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
          {transactionData?.getTransactions?.map((transaction) => (
            <div className="flex py-2 flex-auto justify-between rounded-md border border-soldi border-gray-400 items-center lg:w-[45%] px-4">
              <div className="left flex items-center gap-[4px]">
                <div className="avatar placeholder">
                  <div className={`${transaction.transactionType === "EXPENSE" ? 'bg-red-app' : 'bg-green-app'} text-white w-8 rounded-full`}>
                    <span className="text-xs">{transaction?.category?.name?.split('')[0]}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-gray-925 text-sm lg:text-lg font-semibold">{transaction?.category?.name}</p>
                </div>
              </div>
              <div className="right">
                <p className={`text-sm font-bold ${transaction.transactionType === "EXPENSE" ? 'text-red-app' : 'text-green-app'}`}>
                  {transaction.transactionType === "EXPENSE" ? `-${transaction?.amount}` : `+${transaction?.amount}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home