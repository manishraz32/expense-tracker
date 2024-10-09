import { useEffect, useState } from 'react';
import CommonProgressBar from '../components/CommonProgressBar';
import { GET_WALLET_BY_ID } from '../graphql/queries/wallet.query';
import { GET_EXPENSE_CATEGORIES } from '../graphql/queries/category.query';
import BudgetModal from '../components/BudgetModal';
import { useQuery } from '@apollo/client';
import { CREATE_BUDGET } from '../graphql/mutations/budget.mutations';

const BudgetPage = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const { data: modalData, error, loading } = useQuery(GET_WALLET_BY_ID, {
        variables: { id: user?.wallet?._id }
    })
    const { data: expenseCategoresData, error: expenseError, loading: expenseLoading } = useQuery(GET_EXPENSE_CATEGORIES)

    const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
    const [formData, setFormData] = useState({
        amount: '',
        budgetName: '',
        budgetPeriod: 'monthly',
        categories: [],
        currency: 'INR',
        startDate: '',
        userId: '',
        walletId: ''
      });

      const [createBudget, { data, loading:createBudgetLoading, error:createBudgetError }] = useMutation(CREATE_BUDGET;

    // Example categories and currencies (you can replace this with real data)
    const categories = [
        { name: 'Food', categoryType: 'Expense' },
        { name: 'Salary', categoryType: 'Income' },
        // Add more categories as needed
    ];

    const currencies = ['INR', 'USD', 'EUR']; // Example currencies

    const handleOpenDialog = () => {
        setOpenDialog(true); // Open the dialog
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // Close the dialog
    };

    const handleSubmit = () => {
        // Handle form submission here (e.g., send the data to the backend or update state)
        console.log('Form submitted:', formData);
        handleCloseDialog(); // Close the dialog after submission
    };

    return (
        <div className="flex flex-col gap-4 flex-grow px-[16px] py-4 bg-[#F4F7FA] xl:px-[15%]">
            <BudgetModal
                open={openDialog}
                onClose={handleCloseDialog}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                title="Create New Budget"
                categories={categories}
                currencies={currencies}
            />
            <div className="flex flex-col gap-4 lg:flex-row">
                <div className="p-[15px] shadow-custom bg-white flex flex-col gap-3 rounded-lg">
                    <div>
                        <h1 className="font-semibold text-[18px] text-gray-925">Test</h1>
                        <p className="text-sm text-gray-450"> All Wallets</p>
                    </div>
                    <div>
                        <p className="text-gray-450"><span className="text-[20px] font-bold text-green-app">2000.00 USD </span>left</p>
                        <p className="text-gray-450 text-sm"> FROM 7000 USD</p>
                    </div>
                    <div className="w-full lg:w-80">
                        <div>
                            <CommonProgressBar value={50} />
                        </div>
                        <div className="flex justify-between mt-1">
                            <p className="text-gray-450 text-sm">Sep 19, 2024</p>
                            <p className="text-gray-450 text-sm">Oct 19, 2024</p>
                        </div>
                    </div>
                </div>
                <div className="px-[15px] w-full lg:w-80 py-10 shadow-custom bg-white flex flex-col gap-3 rounded-lg">
                    <p className="text-sm text-gray-450 text-center">Take control of your expenses and save more money with budgets!</p>
                    <button 
                        className="w-full bg-green-button py-2 flex items-center justify-center rounded text-white text-sm font-semibold"
                        onClick={handleOpenDialog}
                    >
                        Create a New Budget
                    </button>
                </div>
            </div>
        </div>

    )
}

export default BudgetPage;