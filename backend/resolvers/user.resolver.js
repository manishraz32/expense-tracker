import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

const userResolver = {
	Mutation: {
		signUp: async (_, { input }, context) => {
			console.log("input", input);
			try {
				const { username, name, email, password, confirmPassword } = input;

				// Check if all fields are provided
				if (!username || !name || !password || !confirmPassword || !email) {
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

				// Check if email already exists
				const existingEmail = await User.findOne({ email });
				if (existingEmail) {
					throw new Error("Email already exists");
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

				// Generate auth token
				const token = jwt.sign(
					{ userId: newUser._id },
					process.env.JWT_SECRET,
					{ expiresIn: '24h' }
				);

				// Set the token as a cookie
				context.res.cookie('authToken', token, {
					httpOnly: true,
					// secure: process.env.NODE_ENV === 'production',
					maxAge: 3600000 * 24, // 1 hour in milliseconds
					// sameSite: 'Strict' // Prevent CSRF attacks
				});

				// Omit the password before returning the new user object
				const userWithoutPassword = {
					_id: newUser._id,
					name: newUser.name,
					username: newUser.username,
					email: newUser.email,
				};

				// Set success status (optional, since 200 is the default)
				return userWithoutPassword;
			} catch (err) {
				console.error("Error in signUp: ", err);
				if (!context.res.headersSent) {
					context.res.status(500); // Internal server error for unexpected issues
				}
				throw new Error(err.message || "Internal server error");
			}
		},
		login: async (_, { input }, context) => {
			try {
				const { email, password } = input;
				if (!email || !password) throw new Error("All fields are required");

				const user = await User.findOne({ email });

				if (!user) {
					throw new Error("user not found");
				}
                console.log("password", password);
				// Check if the password is correct
				const validPassword = await bcrypt.compare(password, user.password);
				console.log("validPassword", validPassword);

				if (!validPassword) {
					throw new Error("Invalid credentials");
				}

				const token = jwt.sign(
					{ userId: user._id },
					process.env.JWT_SECRET,
					{ expiresIn: '24h' }
				)

				// set the token in cookie

				context.res.cookie('authToken', token, {
					httpOnly: true,
					maxAge: 24 * 60 * 60 * 10000
				})
				return {
					_id: user._id,
					username: user.username,
					name: user.name,
					email: user.email
				}
			} catch (error) {
				console.error("Error in login:", error);
				throw new Error(error.message || "Internal server error");
			}
		},

		logout: async (_, __, context) => {
			try {
			  // Clear the authToken cookie
			  context.res.clearCookie("authToken");
		  
			  // Return a success message
			  return { message: "Logged out successfully" };
			} catch (err) {
			  console.error("Error in logout:", err);
			  throw new Error(err.message || "Internal server error");
			}
		  },
		  
	},

	Query: {
		authUser: async (_, __, context) => {
			try {
    			const token = context.req.cookies.authToken;
				console.log("token", token);
				if (!token) {
					throw new Error("Not authentcated, No token provided");
				}

				const decoded = jwt.verify(token, process.env.JWT_SECRET);

				if (!decoded || !decoded.userId) {
					throw new Error("Invaild token, please log in again");
				}

				const user = await User.findById(decoded.userId);

				if (!user) {
					throw new Error("User not found");
				}

				return {
					_id: user._id,
					username: user.username,
					name: user.name,
					email: user.email
				};

			} catch (error) {
				console.error("Error in authMe:", error);
        		throw new Error(error.message || "Internal server error");
			}
		},
		user: async (_, { userId }) => {
			try {
				const user = await User.findById(userId);
				return user;
			} catch (err) {
				console.error("Error in user query:", err);
				throw new Error(err.message || "Error getting user");
			}
		},
	},

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
