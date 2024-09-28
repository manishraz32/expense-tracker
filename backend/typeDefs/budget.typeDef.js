const budgetTypeDef = `#graphql
  type Budget {
    _id: ID!
    budgetName: String!
    amount: Float!  # Changed to Float to allow decimal amounts
    spentSoFar: Float!
    moneyLeft: Float!
    budgetPeriod: String!
    startDate: String!  # Change to String
    endDate: String!    # Change to String
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
    amount: Float!
    spentSoFar: Float
    budgetPeriod: String # Optional field
    startDate: String!   # Change to String
    userId: ID!
  }
`;

export default budgetTypeDef;
