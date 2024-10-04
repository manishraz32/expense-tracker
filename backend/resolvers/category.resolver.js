import Category from '../models/category.model.js'; // Adjust the path as necessary

const categoriesResolvers = {
    Query: {
        // Resolver for getting all categories
        getCategories: async () => {
            try {
                const categories = await Category.find(); // Fetch all categories from the database
                return categories;
            } catch (error) {
                throw new Error("Error fetching categories: " + error.message);
            }
        },
    },
    Mutation: {
        // Resolver for creating a new category
        createCategory: async (_, { input }) => {
            const { name, categoryType } = input; // Destructure the input
            
            // Validate input
            if (!name || !categoryType) {
                throw new Error("Name and category type are required.");
            }
            
            try {
                // Create a new category
                const newCategory = new Category({
                    name,
                    categoryType, // Using categoryType instead of transactionType
                });

                // Save the category to the database
                const savedCategory = await newCategory.save();
                return savedCategory;
            } catch (error) {
                throw new Error("Error creating category: " + error.message);
            }
        },
    },
};

export default categoriesResolvers;
