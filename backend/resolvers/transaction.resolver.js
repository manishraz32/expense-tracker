import Transaction from '../models/transaction.model.js';
import Wallet from '../models/wallet.model.js'
import { UserInputError } from 'apollo-server-express';

const transactionResolvers = {
    Query: {
        getTransactions: async () => {
            try {
                const transactions = await Transaction.find().populate('categoryId');
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
