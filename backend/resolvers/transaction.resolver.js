import Transaction from '../models/transaction.model.js';
import Wallet from '../models/wallet.model.js'
import { UserInputError } from 'apollo-server-express';
import { eachDayOfInterval, format } from 'date-fns';


const transactionResolvers = {
    Query: {
        getTransactions: async (_, { filter: filterVal }) => {

            try {
                // Create the filter object
                const { categoryIds, minAmount, maxAmount } = filterVal;
                console.log("filterVal", filterVal);
                let filter = {};
                // Filter by categoryIds if provided
                if (categoryIds && categoryIds.length > 0) {
                    filter.categoryId = { $in: categoryIds }; // Use $in for multiple category IDs
                }

                // Filter for minimum and maximum amounts
                if (minAmount != null) {
                    filter.amount = { ...filter.amount, $gte: minAmount }; // Filter for minimum amount
                }
                if (maxAmount != null) {
                    filter.amount = { ...filter.amount, $lte: maxAmount }; // Filter for maximum amount
                }
                const transactions = await Transaction.find(filter).populate('categoryId');
                return transactions.map(transaction => ({
                    _id: transaction._id,
                    transactionType: transaction.transactionType,
                    category: transaction.categoryId, // Populated category object
                    transactionDate: transaction.transactionDate,
                    amount: transaction.amount,
                    userId: transaction.userId,
                    walletId: transaction.walletId,
                    createdAt: transaction.createdAt,
                    updatedAt: transaction.updatedAt,
                }));
            } catch (error) {
                throw new Error('Error fetching transactions: ' + error.message);
            }
        },

        getBalanceByDate: async () => {
            // Fetch all transactions
            // Fetch all transactions
            const transactions = await Transaction.find({}).sort({ transactionDate: 1 }); // Sort by date

            const accountData = [];
            let balance = 0;

            // Calculate the balance for each date
            for (const transaction of transactions) {
                const transactionDate = format(transaction.createdAt, 'yyyy-MM-dd');
                console.log("transactionDate", transactionDate)
                if (transaction.transactionType === 'INCOME') {
                    balance += transaction.amount;
                } else if (transaction.transactionType === 'EXPENSE') {
                    balance -= transaction.amount;
                }

                // Check if the date already exists in accountData
                const existingEntry = accountData.find(entry => entry.date === transactionDate);
                if (existingEntry) {
                    existingEntry.balance = balance; // Update existing balance
                } else {
                    accountData.push({ date: transactionDate, balance });
                }
            }

            console.log('Generated account data:', accountData);
            return accountData;
        },
        getDailyIncomeExpense: async (_, { walletId, startDate, endDate }) => {
            try {
                // Fetch all transactions for the wallet within the date range
                const transactions = await Transaction.find({
                    walletId,
                    transactionDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
                }).sort({ transactionDate: 1 });

                const dailyIncomeExpense = [];

                // Generate all dates between startDate and endDate
                const days = eachDayOfInterval({
                    start: new Date(startDate),
                    end: new Date(endDate),
                });

                // Iterate over each day and calculate income and expense
                for (const day of days) {
                    const formattedDay = format(day, 'yyyy-MM-dd');

                    // Get transactions for the current day
                    const dayTransactions = transactions.filter(
                        (transaction) =>
                            format(transaction.transactionDate, 'yyyy-MM-dd') === formattedDay
                    );

                    let dailyIncome = 0;
                    let dailyExpense = 0;

                    // Sum up income and expense for the day
                    dayTransactions.forEach((transaction) => {
                        if (transaction.transactionType === 'INCOME') {
                            dailyIncome += transaction.amount;
                        } else if (transaction.transactionType === 'EXPENSE') {
                            dailyExpense += transaction.amount;
                        }
                    });

                    // Push the result for the current day
                    dailyIncomeExpense.push({
                        date: formattedDay,
                        income: dailyIncome,
                        expense: dailyExpense,
                    });
                }

                return dailyIncomeExpense;
            } catch (error) {
                console.error('Error generating daily income/expense:', error);
                throw new Error('Unable to calculate daily income and expense.');
            }
        },
        getIncomeByCategories: async (_, { walletId, startDate, endDate }) => {
            try {
                const transactions = await Transaction.find({
                    walletId,
                    transactionType: 'INCOME',
                    transactionDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
                }).populate('categoryId');

                console.log("transactions", transactions);
                const datas = [];

                transactions.forEach((transaction) => {
                    let categoryName = transaction.categoryId.name;
                    let categoryData = datas.filter((data) => {
                        return categoryName === data.categoryName;
                    });
                    console.log("categoryData", categoryData);
                    if (categoryData.length > 0) {
                        categoryData[0].transactionCount = categoryData[0].transactionCount + 1;
                        categoryData[0].totalAmount = categoryData[0].totalAmount + transaction.amount;
                    } else {
                        datas.push({
                            categoryName: categoryName,
                            transactionCount: 1,
                            totalAmount: transaction.amount
                        });
                    }
                })

                return datas;
            } catch (error) {
                console.log(error);
            }
        },
        getExpenseByCategories: async (_, { walletId, startDate, endDate }) => {
            try {
                const transactions = await Transaction.find({
                    walletId,
                    transactionType: 'EXPENSE',
                    transactionDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
                }).populate('categoryId');

                console.log("transactions", transactions);
                const datas = [];

                transactions.forEach((transaction) => {
                    let categoryName = transaction.categoryId.name;
                    let categoryData = datas.filter((data) => {
                        return categoryName === data.categoryName;
                    });
                    console.log("categoryData", categoryData);
                    if (categoryData.length > 0) {
                        categoryData[0].transactionCount = categoryData[0].transactionCount + 1;
                        categoryData[0].totalAmount = categoryData[0].totalAmount + transaction.amount;
                    } else {
                        datas.push({
                            categoryName: categoryName,
                            transactionCount: 1,
                            totalAmount: transaction.amount
                        });
                    }
                })

                return datas;
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        createTransaction: async (_, { input }) => {
            const { transactionType, categoryId, transactionDate, amount, userId, walletId } = input;

            // Validation Logic
            if (!transactionType || !['EXPENSE', 'INCOME'].includes(transactionType)) {
                throw new UserInputError('Invalid transaction type. Must be EXPENSE or INCOME.');
            }
            if (!categoryId) {
                throw new UserInputError('Category ID is required.');
            }
            if (!transactionDate) {
                throw new UserInputError('Transaction date is required.');
            }
            if (!amount || amount <= 0) {
                throw new UserInputError('Amount must be a positive number.');
            }
            if (!userId) {
                throw new UserInputError('User ID is required.');
            }
            if (!walletId) {
                throw new UserInputError('Wallet ID is required.');
            }

            try {
                // Create the new transaction
                const newTransaction = new Transaction({
                    transactionType,
                    categoryId,
                    transactionDate,
                    amount,
                    userId,
                    walletId,
                });
                await newTransaction.save();

                // Update the corresponding wallet
                const walletUpdate = {};
                if (transactionType === 'EXPENSE') {
                    walletUpdate.spentSoFar = amount;
                } else if (transactionType === 'INCOME') {
                    walletUpdate.moneyAddedSoFar = amount;
                }

                // Find and update the wallet
                const wallet = await Wallet.findById(walletId);
                if (!wallet) {
                    throw new UserInputError('Wallet not found.');
                }

                // Update wallet fields
                wallet.spentSoFar += walletUpdate.spentSoFar || 0; // Update spentSoFar if it's an expense
                wallet.moneyAddedSoFar += walletUpdate.moneyAddedSoFar || 0; // Update moneyAddedSoFar if it's income

                // Save the wallet after updating
                await wallet.save();

                return newTransaction;
            } catch (error) {
                throw new Error('Error creating transaction: ' + error.message);
            }
        }

    },
};

export default transactionResolvers;
