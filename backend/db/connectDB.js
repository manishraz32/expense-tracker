// db.js
import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';
import dotenv from "dotenv";

dotenv.config();

const dbURI = process.env.MONGO_URI;

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(dbURI);
		logger.info(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		logger.error(`MongoDB connection error: ${error.message}`);
		process.exit(1); // Exit process on failure
	}
};
