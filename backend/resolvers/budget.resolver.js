import Budget from '../models/budget.model.js';
import User from '../models/user.model.js';

const budgetResolver = {
  Query: {
    getBudget: async (_, { budgetId }) => {
      try {
        const budget = await Budget.findById(budgetId);
        if (!budget) {
          throw new Error("Budget not found");
        }
        return budget;
      } catch (err) {
        console.error("Error in getBudget:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    getBudgetsByUser: async (_, { userId }) => {
      try {
        const budgets = await Budget.find({ userId });
        return budgets;
      } catch (err) {
        console.error("Error in getBudgetsByUser:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },

  Mutation: {
    createBudget: async (_, { input }, context) => {
      try {
        const { budgetName, amount, startDate, userId } = input;

        // Validate input fields
        if (!budgetName || !amount || !startDate || !userId) {
          throw new Error("All fields are required");
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }

        // Create a new budget
        const newBudget = new Budget({
          budgetName,
          amount,
          spentSoFar: spentSoFar || 0, // Default to 0 if not specified
          budgetPeriod: budgetPeriod || 'monthly', // Default to 'monthly' if not specified
          startDate,
          endDate: new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 30)), // Set endDate to 30 days after startDate
          userId,
        });

        // Save the budget to the database
        await newBudget.save();

        return newBudget;
      } catch (err) {
        console.error("Error in createBudget:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
};

export default budgetResolver;
