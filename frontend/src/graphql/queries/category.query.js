import { gql } from "@apollo/client";

export const GET_EXPENSE_CATEGORIES = gql`
    query GetExpenseCategories {
        getExpenseCategories {
            _id
            name
            categoryType
        }
    }
`

export const GET_INCOME_CATEGORIES = gql`
    query GetIncomeCategories {
        getIncomeCatogries {
            _id
            name
            categoryType
        }
    }
`

export const GET_CATEGORIES = gql`
    query GetCategories {
        getCategories {
            _id
            name
            categoryType
        }
    }
`