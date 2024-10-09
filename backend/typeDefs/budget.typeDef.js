const budgetTypeDef = `#graphql
  type Budget {
    _id: ID!
    budgetName: String!
    amount: Float!
    spentSoFar: Float!
    moneyLeft: Float!
    dailyLimit: Float!
    budgetPeriod: String!
    startDate: String!
    endDate: String!
    userId: ID!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getBudget(budgetId: ID!): Budget
    getBudgetsByUser(userId: ID!): [Budget!]!  # Query to get budgets for a user
  }

  type Mutation {
    createBudget(input: BudgetInput!): Budget!
  }

  input BudgetInput {
    budgetName: String!
    currency: String!
    amount: Float!
    categories:[ID!]!
    budgetPeriod: String!
    startDate: String!
    walletId: ID!
    userId: ID!
  }
`;

export default budgetTypeDef;
