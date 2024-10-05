const categoryTypeDef = `#graphql
    
    scalar Date
    
    enum TransactionType {
        EXPENSE
        INCOME
    }

    type Query {
        getCategories: [Category]
        getIncomeCatogries: [Category]
        getExpenseCategories: [Category]
    }

    type Mutation {
        createCategory(input: CategoryInput!): Category
    }

    input CategoryInput {
      name: String!
      categoryType: TransactionType!
    }

    type Category {
        _id: ID!
        name: String!
        categoryType: TransactionType!
    }
    
`

export default categoryTypeDef;