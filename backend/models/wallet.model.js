import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  walletName: {
    type: String,
    required: true,
    trim: true,
  },
  initialBalance: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;
