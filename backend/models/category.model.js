import mongoose from 'mongoose';

const { Schema } = mongoose;

// Enum for transaction types
const transactionTypes = {
    EXPENSE: 'EXPENSE',
    INCOME: 'INCOME',
};

// Category Schema definition
const categorySchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        auto: true, // Automatically generates an ObjectId
    },
    name: {
        type: String,
        required: true,
        unique: true, // Category name should be unique
    },
    categoryType: {
        type: String,
        enum: [transactionTypes.EXPENSE, transactionTypes.INCOME], // Enum for expense or income
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

// Middleware to update 'updatedAt' on each save
categorySchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Create the Category model
const Category = mongoose.model('Category', categorySchema);

export default Category;
