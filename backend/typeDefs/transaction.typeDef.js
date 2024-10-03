const transactionTypeDef = `#graphql
    
    scalar Date

    enum TransactionType {
        EXPENSE
        INCOME
    }

    type Query {
        getTransactions: [Transaction]
    }

    type Mutation {
        createTransaction(input: TransactionInput!): Transaction
    }

    input TransactionInput {
        transactionType: TransactionType!  # Changed to enum
        categoryId: ID!
        transactionDate: Date!
        amount: Float!
        userId: ID!
        walletId: ID!
    }

    type Transaction {
        id: ID!
        transactionType: TransactionType!
        categoryGId: ID!
        transactionDate: Date!
        amount: Float!
        userId: ID!
        walletId: ID!
        createdAt: Date!
        updatedAt: Date!
    }

`
