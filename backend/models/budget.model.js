import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  budgetName: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0, // Ensure the budget amount is non-negative
  },
  spentSoFar: {
    type: Number,
    default: 0, // Default to 0 if not specified
    min: 0, // Ensure spent amount is non-negative
  },
  moneyLeft: {
    type: Number,
    default: function () {
      return this.amount - this.spentSoFar; // Calculate money left from the start
    },
  },
  budgetPeriod: {
    type: String,
    required: true,
    enum: ['daily', 'weekly', 'monthly', 'yearly'], // Restrict values to specific periods
    default: 'monthly', // Set default value to "monthly"
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
    default: function() {
      // Set endDate to 30 days after startDate if startDate is provided
      if (this.startDate) {
        const endDate = new Date(this.startDate);
        endDate.setDate(endDate.getDate() + 30); // Add 30 days
        return endDate;
      }
      return null; // Return null if startDate is not set yet
    },
    validate: {
      validator: function (value) {
        return value >= this.startDate; // Ensure endDate is after startDate
      },
      message: 'End date must be after the start date',
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to update 'updatedAt' automatically before saving
budgetSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  this.moneyLeft = this.amount - this.spentSoFar; // Calculate money left whenever saved
  next();
});

// Method to calculate daily spending limit
budgetSchema.methods.canSpendDaily = function () {
  const budgetDuration = (this.endDate - this.startDate) / (1000 * 60 * 60 * 24); // Duration in days
  return this.moneyLeft / budgetDuration; // Money left divided by the number of days
};

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;
