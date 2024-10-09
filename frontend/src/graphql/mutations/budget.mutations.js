import { gql } from "@apollo/client";

export const CREATE_BUDGET = gql`
	mutation CreateBudget($input: BudgetInput!) {
        createBudget(input: $input) {
          _id
          dailyLimit
          budgetName
          amount
          spentSoFar
          moneyLeft
          budgetPeriod
          startDate
          endDate
          userId
          createdAt
          updatedAt
  }
}
`;
