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
        transactionType: TransactionType!
        categoryId: ID!
        transactionDate: Date!
        amount: Float!
        userId: ID!
        walletId: ID!
    }

    type Transaction {
        _id: ID!
        transactionType: TransactionType!
        categoryId: ID!
        transactionDate: Date!
        amount: Float!
        userId: ID!
        walletId: ID!
        createdAt: Date!
        updatedAt: Date!
    }

`
export default transactionTypeDef;