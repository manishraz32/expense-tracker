import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    transactionType: {
        type: String,
        enum: ['EXPENSE', 'INCOME'],
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category', 
    },
    transactionDate: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', 
    },
    walletId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Wallet',
    },
}, {
    timestamps: true, // Automatically create createdAt and updatedAt fields
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
