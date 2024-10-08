const transactionTypeDef = `#graphql
    
    scalar Date

    enum TransactionType {
        EXPENSE
        INCOME
    }

    type Query {
        getTransactions(filter: TransactionFilterInput): [Transaction]
        getBalanceByDate: [AccountBalance!]
        getDailyIncomeExpense(walletId: ID!, startDate: String!, endDate: String!): [ExpenseIncome!]

    }

    type Mutation {
        createTransaction(input: TransactionInput!): Transaction
    }

    # Input type for filtering transactions
    input TransactionFilterInput {
        categoryIds: [ID!]  # Array of category IDs to filter by
        minAmount: Float  # Minimum amount for filtering
        maxAmount: Float  # Maximum amount for filtering
    }

    input TransactionInput {
        transactionType: TransactionType!
        categoryId: ID!
        transactionDate: Date!
        amount: Float!
        userId: ID!
        walletId: ID!
    }

    type AccountBalance {
        date: String!
        balance: Float!
    }

    type ExpenseIncome {
        date: String!
        expense: Float!
        income: Float!
    }

    type Transaction {
        _id: ID!
        transactionType: TransactionType!
        category: Category!
        transactionDate: Date!
        amount: Float!
        userId: ID!
        walletId: ID!
        createdAt: Date!
        updatedAt: Date!
    }

    type Category {
        id: ID!
        name: String!
    }

`
export default transactionTypeDef;