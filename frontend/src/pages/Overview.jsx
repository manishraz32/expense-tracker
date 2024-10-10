import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import PlusIcon from '../assets/PlusIcon';
import ExpenceChart from '../components/ExpenceChart';
import { useMutation, useQuery } from '@apollo/client';
import { GET_EXPENSE_CATEGORIES, GET_INCOME_CATEGORIES } from '../graphql/queries/category.query';
import CommonDialog from '../components/CommonDialog ';
import { ADD_EXPENCE_TRANSACTION } from '../graphql/mutations/transaction.mutation';
import { GET_WALLET_BY_ID } from '../graphql/queries/wallet.query';
import { GET_DAILY_INCOME_EXPENCE, GET_EXPENCE_BY_CATEGORIES, GET_INCOME_BY_CATEGORIES, GET_TRANSACTIONS } from '../graphql/queries/transaction.query';
import toast from 'react-hot-toast'
import BalanceStatusCard from '../components/BalanceStatusCard';
import CustomAreaChart from '../components/CustomAreaCharts';
import { format } from 'date-fns';
import CustomBarChart from '../components/MoneyChangesChart';
import CustomPieChart from '../components/CustomPieChart';
import { getCurrentMonthDates } from '../utils/datetimeutils';

const Overview = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { startDate, endDate } = getCurrentMonthDates();

  const [incomePieChartData, setIncomePieChartData] = useState([]);
  const [expensePieChartData, setExpensePieChartData] = useState([]);

  const queryVariables = { walletId: user.wallet._id, startDate, endDate, };

  const { data: expenseCategoresData, error: expenseError, loading: expenseLoading } = useQuery(GET_EXPENSE_CATEGORIES)
  const { data: incomeCategoriesData, error: incomeError, loading: loadingError } = useQuery(GET_INCOME_CATEGORIES);
  const { data: dailyIncomeExpenceData } = useQuery(GET_DAILY_INCOME_EXPENCE, {
    variables: queryVariables
  });

  const { data: incomeByCategories } = useQuery(GET_INCOME_BY_CATEGORIES, {
    variables: queryVariables
  });

  const { data: expenseByCategories } = useQuery(GET_EXPENCE_BY_CATEGORIES, {
    variables: queryVariables
  });

  console.log("incomeBycategories", incomeByCategories);
  useEffect(() => {
    const incomePieChartData = incomeByCategories?.getIncomeByCategories?.map((data) => {
      console.log("data1", data);
      return { name: data.categoryName, totalAmount: data.totalAmount }
    })
    const expensePieChartData = expenseByCategories?.getExpenseByCategories?.map((data) => {
      return { name: data.categoryName, totalAmount: data.totalAmount }
    })
    // console.log("data", incomePieChartData);
    setIncomePieChartData(incomePieChartData);
    setExpensePieChartData(expensePieChartData);

  }, [incomeByCategories, expenseByCategories]);


  // muatation 
  const [createTransaction, { loading: createTransLoading }] = useMutation(ADD_EXPENCE_TRANSACTION, {
    refetchQueries: [
      GET_WALLET_BY_ID,
      GET_TRANSACTIONS
    ],
  });



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
















  // datas
  const accountData = [
    { date: '2024-01-01', balance: 500 },
    { date: '2024-01-05', balance: 5000 },
    { date: '2024-01-10', balance: 1000 },
    { date: '2024-01-15', balance: 500 }
  ];

  // Format the date
  const sampleData = accountData.map(entry => ({
    ...entry,
    date: format(new Date(entry.date), 'MMM dd, yyyy'), // 'Oct 06, 2024' format
  }));





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

      {/* <div className="p-[15px] flex flex-col gap-2 bg-[#fff] rounded-lg">
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

      </div> */}


      <div className="flex gap-5 overflow-auto px-[-16px]">
        <BalanceStatusCard />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="w-full h-[400px] bg-[#fff] rounded-lg">
            <CustomAreaChart
              data={sampleData}
              xKey="date"
              yKey="balance"
              fillColor="#bbf7d0"
              strokeColor="#16a34a"
            />
          </div>
          <div className="w-full h-[400px] bg-[#fff] rounded-lg">
            <CustomBarChart data={dailyIncomeExpenceData?.getDailyIncomeExpense} xKey={'date'} />
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="w-full lg:w-[50%]  bg-[#fff] rounded-lg p-4">
            <p className="font-semibold">Total Income</p>
            <div className="w-full ">
              <CustomPieChart
                data={incomePieChartData}
                outerRadius={100}
                fill="#2dba75"
                dataKey="totalAmount"
                label={true}
              // showLegend={true}
              />
            </div>
            {
              incomeByCategories?.getIncomeByCategories.map(({categoryName, totalAmount, transactionCount}) => (
                <div className="flex items-center justify-between mt-4">
                  <div className="flex-1 flex items-center gap-2">
                    <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full text-white bg-green-app">{categoryName.charAt(0).toUpperCase()}</div>
                    <div className="text-gray-925 font-normal text-lg">{categoryName}</div>
                  </div>
                  <div className="text-gray-925 flex-1 font-normal text-lg"> {transactionCount} Transactions</div>
                  <div className="text-lg text-green-app flex-1 font-bold">+{totalAmount.toFixed(2)} INR</div>
                </div>
              ))
            }
          </div>
          <div className="w-full lg:w-[50%] bg-[#fff] rounded-lg p-4">
            <p className="font-semibold">Total Expense</p>
            <div className="w-full">
                <CustomPieChart
                  data={expensePieChartData}
                  outerRadius={100}
                  fill="#f14c52"
                  dataKey="totalAmount"
                  label={true}
                // showLegend={true}
                />
            </div>
            {
              expenseByCategories?.getExpenseByCategories.map(({categoryName, totalAmount, transactionCount}) => (
                <div className="flex items-center justify-between mt-4">
                  <div className="flex-1 flex items-center gap-2">
                    <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full text-white bg-red-app">{categoryName.charAt(0).toUpperCase()}</div>
                    <div className="text-gray-925 font-normal text-lg">{categoryName}</div>
                  </div>
                  <div className="text-gray-925 font-normal text-lg flex-1"> {transactionCount} Transactions</div>
                  <div className="text-lg text-red-app font-bold flex-1">-{totalAmount.toFixed(2)} INR</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview;