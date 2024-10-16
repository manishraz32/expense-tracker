import { useEffect, useState } from 'react';
import CommonProgressBar from '../components/CommonProgressBar';
import { GET_WALLET_BY_ID } from '../graphql/queries/wallet.query';
import { GET_EXPENSE_CATEGORIES } from '../graphql/queries/category.query';
import BudgetModal from '../components/BudgetModal';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_BUDGET } from '../graphql/mutations/budget.mutations';
import toast from 'react-hot-toast'
import { GET_BUDGETS } from '../graphql/queries/budget.query';
import WalletBalanceCard from '../components/WalletBalanceCard';
import { convertDateFormat } from '../utils/datetimeutils'


const currencies = ['INR'];

const BudgetPage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [budget, setBudget] = useState(null);
    const [precentage, setPercentage] = useState(0);
    const { data: modalData, error, loading } = useQuery(GET_WALLET_BY_ID, {
        variables: { id: user?.wallet?._id }
    })

    const { data: budgetsData } = useQuery(GET_BUDGETS, {
        variables: { userId: user?._id }
    });


    useEffect(() => {
        let currentBudget = null;
        if (budgetsData?.getBudgetsByUser?.length > 0) {
            setBudget(budgetsData.getBudgetsByUser[0]);
            currentBudget = budgetsData.getBudgetsByUser[0];
        }
        const total = currentBudget?.amount;
        const spent = currentBudget?.spentSoFar;
        if(total == 0) {
            setPercentage(0);
            return;
        }
        const precent = (spent / total) * 100;
        setPercentage(precent);
    }, [budgetsData])



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

    const [createBudget, { data, loading: createBudgetLoading, error: createBudgetError }] = useMutation(CREATE_BUDGET)

    const handleOpenDialog = () => {
        setOpenDialog(true); // Open the dialog
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // Close the dialog
    };

    const handleSubmit = async () => {
        try {
            const response = await createBudget({
                variables: {
                    input: {
                        amount: parseFloat(formData.amount),
                        budgetName: formData.budgetName,
                        budgetPeriod: 'monthly',
                        categories: formData.categories.map((category) => category._id),
                        currency: 'INR',
                        startDate: formData.startDate,
                        userId: user?._id,
                        walletId: user?.wallet._id
                    },
                },
            });
            toast.success("Budget create successfully");
        } catch (err) {
            console.error('Error creating budget:', err);
        }
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
                categories={expenseCategoresData?.getExpenseCategories}
                currencies={currencies}
            />
            <div className="flex flex-col gap-4 lg:flex-row">
                {
                    budget && <div className="p-[15px] shadow-custom bg-white flex flex-col gap-3 rounded-lg border-[2px] border-solid border-green-app">
                        <div>
                            <h1 className="font-semibold text-[18px] text-gray-925">{budget?.budgetName}</h1>
                        </div>
                        <div>
                            <p className="text-gray-450"><span className="text-[20px] font-bold text-green-app">{budget.moneyLeft} INR </span>left</p>
                            <p className="text-gray-450 text-sm"> FROM {budget.amount} INR</p>
                        </div>
                        <div className="w-full lg:w-80">
                            <div>
                                <CommonProgressBar value={precentage || 0} />
                            </div>
                            <div className="flex justify-between mt-1">
                                <p className="text-gray-450 text-sm">{convertDateFormat(budget.startDate)}</p>
                                <p className="text-gray-450 text-sm">{convertDateFormat(budget.endDate)}</p>
                            </div>
                        </div>
                    </div>
                }
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
            <div className="flex  w-full flex-row gap-4 overflow-auto">
                <div className="px-[15px] py-3 bg-white rounded-lg flex-1">
                    <p className="text-[#455A65] font-semibold tracking-wide">Originally Budgeted</p>
                    <p className={`text-[24px] font-semibold text-green-app tracking-wider min-w-[240px]`}>{budget?.amount} INR</p>
                </div>
                <div className="px-[15px] py-3 bg-white rounded-lg flex-1">
                    <p className="text-[#455A65] font-semibold tracking-wide">Spent so far</p>
                    <p className={`text-[24px] font-semibold text-red-app tracking-wider min-w-[240px]`}>-{budget?.spentSoFar} INR</p>
                </div>
                <div className="px-[15px] py-3 bg-white rounded-lg flex-1">
                    <p className="text-[#455A65] font-semibold tracking-wide">Money left</p>
                    <p className={`text-[24px] font-semibold text-green-app tracking-wider min-w-[240px]`}>{budget?.moneyLeft} INR</p>
                </div>
                <div className="px-[15px] py-3 bg-white rounded-lg flex-1">
                    <p className="text-[#455A65] font-semibold tracking-wide">You can spend</p>
                    <p className={`text-[24px] font-semibold text-gray-700 tracking-wider min-w-[240px]`}>{budget?.dailyLimit.toFixed(2) } INR/DAY</p>
                </div>
            </div>
            <div className="flex flex-col gap-10 p-4 pb-8 w-full bg-white rounded-lg">
                <div className="text-gray-925 text-lg">Budget progress</div>
                <div className="flex w-full justify-center">
                    <div className="flex flex-col gap-10 w-[60%]">
                        <div className="text-center text-gray-925">Keep spending You can spend <span className="text-black text-lg font-semibold">{budget?.dailyLimit.toFixed(2)} INR</span> each day for the rest of the period.</div>
                        <CommonProgressBar value={precentage} />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="bg-green-400 p-2 text-white">Keep Spending</div>
                </div>
            </div>
        </div>

    )
}

export default BudgetPage;