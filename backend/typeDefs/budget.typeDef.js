const budgetTypeDef = `#graphql
  type Budget {
    _id: ID!
    budgetName: String!
    amount: Float!  # Changed to Float to allow decimal amounts
    spentSoFar: Float!
    moneyLeft: Float!
    budgetPeriod: String!
    startDate: Date!
    endDate: Date!
    userId: ID!
    createdAt: Date!
    updatedAt: Date!
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
    amount: Float!
    spentSoFar: Float
    budgetPeriod: String # Optional field
    startDate: Date!
    userId: ID!
  }
`;

export default budgetTypeDef;
