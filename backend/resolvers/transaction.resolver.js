import Transaction from '../models/Transaction.js';
import { UserInputError } from 'apollo-server-express';

const transactionResolvers = {
    Query: {
        getTransactions: async () => {
            try {
                const transactions = await Transaction.find().populate('categoryId userId walletId');
                return transactions;
            } catch (error) {
                throw new Error('Error fetching transactions: ' + error.message);
            }
        },
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
                const newTransaction = new Transaction({
                    transactionType,
                    categoryId,
                    transactionDate,
                    amount,
                    userId,
                    walletId,
                });
                await newTransaction.save();
                return newTransaction;
            } catch (error) {
                throw new Error('Error creating transaction: ' + error.message);
            }
        },
    },
};

export default transactionResolvers;
