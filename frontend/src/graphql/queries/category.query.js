import { gql } from "@apollo/client";

export const GET_EXPENSE_CATEGORIES = gql`
    query GetExpenseCategories {
        getExpenseCategories {
            id
            name
            categoryType
        }
    }
`

export const GET_INCOME_CATEGORIES = gql`
    query GetIncomeCtegories {
        getIncomeCategores {
            id
            name
            categoryType
        }
    }
`