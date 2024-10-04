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
        default: 0, // Represents the current balance
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
    this.moneyLeft = this.initialBalance + this.moneyAddedSoFar - this.spentSoFar; // Calculate current balance
    this.changeTillNow = this.moneyAddedSoFar - this.spentSoFar; // Calculate changes
    next();
});

// Middleware to handle updates during findOneAndUpdate
walletSchema.pre('findOneAndUpdate', async function(next) {
    const update = this.getUpdate();

    // Fetch the existing wallet document
    const wallet = await this.model.findOne(this.getQuery());

    // Default values if not updated
    const spentSoFar = update.spentSoFar !== undefined ? update.spentSoFar : wallet.spentSoFar;
    const moneyAddedSoFar = update.moneyAddedSoFar !== undefined ? update.moneyAddedSoFar : wallet.moneyAddedSoFar;
    const initialBalance = wallet.initialBalance;

    // Calculate the new values
    const moneyLeft = initialBalance + moneyAddedSoFar - spentSoFar; // Current balance
    const changeTillNow = moneyAddedSoFar - spentSoFar; // Calculate changes

    // Apply updates to the document
    this.set({ moneyLeft, changeTillNow });

    next();
});

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;
