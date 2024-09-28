import Wallet from "../models/wallet.model.js";
import User from "../models/user.model.js";

const walletResolver = {
	Mutation: {
		createWallet: async (_, { input }, context) => {
            try {
              const { walletName, initialBalance, userId } = input;
      
              // Check if the user is authenticated
              //   if (!context.user) {
              //     throw new Error("Authentication required");
              //   }
      
              // Ensure the authenticated user is the one creating the wallet
              //   if (context.user._id !== userId) {
              //     throw new Error("Unauthorized action");
              //   }
      
              // Validate input fields
              if (!walletName || !initialBalance || !userId) {
                throw new Error("All fields are required");
              }
      
              // Check if the user exists
              const user = await User.findById(userId);
              if (!user) {
                throw new Error("User not found");
              }
      
              // Get all wallets of the user
              const allWallets = await Wallet.find({ userId });
      
              // If the user already has a wallet, throw an error
            //   if (allWallets.length > 0) {
            //     throw new Error("Only one wallet is allowed per user");
            //   }
      
              // Check if wallet name already exists
              const isNameExist = allWallets?.find((wallet) => wallet.walletName === walletName);
              if (isNameExist) {
                throw new Error("Wallet name already exists");
              }
      
              // Create a new wallet
              const newWallet = new Wallet({
                walletName,
                initialBalance,
                userId, // Reference the user who owns this wallet
              });
      
              // Save the wallet to the database
              await newWallet.save();
      
              return newWallet;
            } catch (err) {
              console.error("Error in createWallet: ", err);
              throw new Error(err.message || "Internal server error");
            }
          },
	},
};

export default walletResolver;
