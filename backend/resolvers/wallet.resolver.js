import Wallet from '../models/wallet.model.js'; // Adjust the path as needed
import { ValidationError } from 'apollo-server-express'; // Apollo's built-in error handling

// Validate wallet input data
const validateWalletInput = async (input) => {
  console.log("walletinput2", input);
  const { walletName, userId, initialBalance } = input;

  try {
      if (!walletName || typeof walletName !== 'string') {
          throw new ValidationError('Wallet Name is a required field');
      }
      if (!userId || typeof userId !== 'string') {
          throw new ValidationError('User ID is required and must be a string.');
      }
      if (typeof initialBalance !== 'number' || initialBalance < 0) {
          throw new ValidationError('Initial balance must be a non-negative number.');
      }
      const wallets = await Wallet.find({ userId });
      if (wallets?.length > 0) {
          throw new ValidationError('Only one wallet is allowed for a user.');
      }
  } catch (error) {
      console.error('Validation error:', error); // Log the error
      throw error; // Rethrow the error to be handled by GraphQL
  }
};


const walletResolvers = {
    Query: {
        // Get all wallets
        getWallets: async () => {
            try {
                return await Wallet.find(); // Retrieve all wallets
            } catch (error) {
                throw new Error('Error fetching wallets: ' + error.message);
            }
        },

        // Get a wallet by ID
        getWalletById: async (_, { id }) => {
            try {
                const wallet = await Wallet.findById(id);
                if (!wallet) {
                    throw new Error('Wallet not found');
                }
                return wallet;
            } catch (error) {
                throw new Error('Error fetching wallet: ' + error.message);
            }
        },
    },

    Mutation: {
        // Create a new wallet with validation
        createWallet: async (_, { input }) => {
            await validateWalletInput(input); // Validate input data
            try {
                const wallet = new Wallet(input); // Create a new wallet instance
                await wallet.save(); // Save to the database
                return wallet;
            } catch (error) {
                throw new Error('Error creating wallet: ' + error.message);
            }
        },

        // Update an existing wallet with validation
        updateWallet: async (_, { id, input }) => {
            await validateWalletInput(input); // Validate input data
            try {
                const wallet = await Wallet.findByIdAndUpdate(id, input, {
                    new: true, // Return the updated document
                    runValidators: true, // Validate input against schema
                });
                if (!wallet) {
                    throw new Error('Wallet not found');
                }
                return wallet;
            } catch (error) {
                throw new Error('Error updating wallet: ' + error.message);
            }
        },

        // Delete a wallet
        deleteWallet: async (_, { id }) => {
            try {
                const wallet = await Wallet.findByIdAndDelete(id);
                if (!wallet) {
                    throw new Error('Wallet not found');
                }
                return `Wallet with ID: ${id} has been deleted`;
            } catch (error) {
                throw new Error('Error deleting wallet: ' + error.message);
            }
        },
    },
};

export default walletResolvers;
