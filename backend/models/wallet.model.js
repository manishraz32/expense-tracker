import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to the User model
    },
    walletName: {
      type: String,
      required: true
    },
    initialBalance: {
        type: Number,
        required: true,
        default: 0, // Default balance
    },
    currency: {
        type: String,
        default: 'INR'
    },
    spentSoFar: {
        type: Number,
        default: 0,
    },
    moneyAddedSoFar: {
        type: Number,
        default: 0,
    },
    moneyLeft: {
        type: Number,
        default: 0,
    },
    changeTillNow: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

// Middleware to update moneyLeft and changeTillNow before saving
walletSchema.pre('save', function(next) {
    this.moneyLeft = this.initialBalance - this.spentSoFar;
    this.changeTillNow = this.moneyAddedSoFar - this.spentSoFar;
    next();
});

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;
