import { gql } from "@apollo/client";

export const GET_BUDGETS = gql`
   query GetBudgetsByUser($userId: ID!) {
        getBudgetsByUser(userId: $userId) {
          _id
          budgetName
          amount
          spentSoFar
          moneyLeft
          dailyLimit
          budgetPeriod
          categories
          startDate
          endDate
          userId
          createdAt
          updatedAt
        }
}
    
`