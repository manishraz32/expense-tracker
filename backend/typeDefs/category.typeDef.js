const categoryTypeDef = `#graphql
    
    scalar Date
    
    enum TransactionType {
        EXPENSE
        INCOME
    }

    type Query {
        getCategories: [Category]
    }

    type Mutation {
        createCategory(input: CategoryInput!): Category
    }

    input CategoryInput {
      name: String!
      categoryType: TransactionType!
    }

    type Category {
        id: ID!
        name: String!
        categoryType: TransactionType!
    }
    
`