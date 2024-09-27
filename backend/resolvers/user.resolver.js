import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
	Mutation: {
		signUp: async (_, { input }, context) => {
            try {
                const { username, name, email, password, confirmPassword } = input;
        
                // Check if all fields are provided
                if (!username || !name || !password || !confirmPassword) {
                    throw new Error("All fields are required");
                }
        
                // Check if passwords match
                if (password !== confirmPassword) {
                    throw new Error("Passwords do not match");
                }
        
                // Check if user already exists
                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    throw new Error("User already exists");
                }
        
                // Hash the password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
        
                // Create the new user
                const newUser = new User({
                    name,
                    username,
                    email,
                    password: hashedPassword,
                });
        
                // Save the user to the database
                await newUser.save();
        
                // Optional: Implement context login functionality
                // await context.login(newUser);
        
                // Omit the password before returning the new user object
                const userWithoutPassword = {
                    _id: newUser._id,
                    name: newUser.name,
                    username: newUser.username,
                    email: newUser.email,
                };
        
                return userWithoutPassword;
            } catch (err) {
                console.error("Error in signUp: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },
        


		// login: async (_, { input }, context) => {
		// 	try {
		// 		const { username, password } = input;
		// 		if (!username || !password) throw new Error("All fields are required");
		// 		const { user } = await context.authenticate("graphql-local", { username, password });

		// 		await context.login(user);
		// 		return user;
		// 	} catch (err) {
		// 		console.error("Error in login:", err);
		// 		throw new Error(err.message || "Internal server error");
		// 	}
		// },

		// logout: async (_, __, context) => {
		// 	try {
		// 		await context.logout();
		// 		context.req.session.destroy((err) => {
		// 			if (err) throw err;
		// 		});
		// 		context.res.clearCookie("connect.sid");

		// 		return { message: "Logged out successfully" };
		// 	} catch (err) {
		// 		console.error("Error in logout:", err);
		// 		throw new Error(err.message || "Internal server error");
		// 	}
		// },
	},

	// Query: {
	// 	authUser: async (_, __, context) => {
	// 		try {
	// 			const user = await context.getUser();
	// 			return user;
	// 		} catch (err) {
	// 			console.error("Error in authUser: ", err);
	// 			throw new Error("Internal server error");
	// 		}
	// 	},
	// 	user: async (_, { userId }) => {
	// 		try {
	// 			const user = await User.findById(userId);
	// 			return user;
	// 		} catch (err) {
	// 			console.error("Error in user query:", err);
	// 			throw new Error(err.message || "Error getting user");
	// 		}
	// 	},
	// },

	// User: {
	// 	transactions: async (parent) => {
	// 		try {
	// 			const transactions = await Transaction.find({ userId: parent._id });
	// 			return transactions;
	// 		} catch (err) {
	// 			console.log("Error in user.transactions resolver: ", err);
	// 			throw new Error(err.message || "Internal server error");
	// 		}
	// 	},
	// },
};

export default userResolver;
