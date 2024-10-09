import Budget from '../models/budget.model.js'; // Adjust the import path as necessary
import User from '../models/user.model.js'; // Adjust the import path as necessary
import Wallet from '../models/wallet.model.js';

const budgetResolver = {
  Query: {
    getBudget: async (_, { budgetId }) => {
      try {
        const budget = await Budget.findById(budgetId);
        if (!budget) throw new Error('Budget not found');

        // Convert dates to strings for the response
        return {
          ...budget._doc,
          startDate: budget.startDate.toISOString(), // Convert to string
          endDate: budget.endDate.toISOString(),     // Convert to string
          createdAt: budget.createdAt.toISOString(), // Convert to string
          updatedAt: budget.updatedAt.toISOString(), // Convert to string
        };
      } catch (err) {
        console.error('Error in getBudget: ', err);
        throw new Error(err.message || 'Internal server error');
      }
    },

    getBudgetsByUser: async (_, { userId }) => {
      try {
        const budgets = await Budget.find({ userId });
        return budgets.map(budget => ({
          ...budget._doc,
          startDate: budget.startDate.toISOString(), // Convert to string
          endDate: budget.endDate.toISOString(),     // Convert to string
          createdAt: budget.createdAt.toISOString(), // Convert to string
          updatedAt: budget.updatedAt.toISOString(), // Convert to string
        }));
      } catch (err) {
        console.error('Error in getBudgetsByUser: ', err);
        throw new Error(err.message || 'Internal server error');
      }
    },
  },

  Mutation: {
    createBudget: async (_, { input }, context) => {
      try {
        const { budgetName, currency, amount, categories, budgetPeriod, startDate, walletId, userId } = input;

        // Validate input fields
        if (!budgetName ||  !currency || !amount || !categories || !budgetPeriod || !startDate || !walletId || !userId) {
          throw new Error('All required fields must be provided');
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }

        const wallet = await Wallet.findById(walletId);
        if(!wallet) {
          throw new Error("Wallet not found");
        }

        // Create a new budget
        const newBudget = new Budget({
          budgetName,
          amount,
          budgetPeriod: budgetPeriod || 'monthly', // Default to 'monthly' if not provided
          startDate: new Date(startDate), // Store as a Date
          endDate: new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 30)), // Default end date to 30 days after start date
          walletId,
          userId,
          categories: categories
        });

        // Save the budget to the database
        await newBudget.save();

        // Return the new budget with date fields formatted as strings
        return {
          ...newBudget._doc,
          startDate: newBudget.startDate.toISOString(),
          endDate: newBudget.endDate.toISOString(),
          createdAt: newBudget.createdAt.toISOString(),
          updatedAt: newBudget.updatedAt.toISOString(),
        };
      } catch (err) {
        console.error('Error in createBudget: ', err);
        throw new Error(err.message || 'Internal server error');
      }
    },
  },
};

export default budgetResolver;
