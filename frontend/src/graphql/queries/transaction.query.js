import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
	query GetTransactions($filter: TransactionFilterInput) {
		getTransactions(filter: $filter) {
			_id
			amount
			category {
				id
				name
			}
			createdAt
			transactionDate
			transactionType
			updatedAt
			userId
			walletId
		}
	}
`;

export const GET_DAILY_INCOME_EXPENCE = gql`
	query GetDailyIncomeExpense($walletId: ID!, $startDate: String!, $endDate: String!) {
	  getDailyIncomeExpense(walletId: $walletId, startDate: $startDate, endDate: $endDate) {
	    date
	    expense
	    income
	  }
	}
`

export const GET_INCOME_BY_CATEGORIES = gql`
	query GetIncomeByCategories($walletId: ID!, $startDate: String!, $endDate: String!) {
	  getIncomeByCategories(walletId: $walletId, startDate: $startDate, endDate: $endDate) {
	    categoryName
	    totalAmount
	    transactionCount
	  }
	}
`

export const GET_EXPENCE_BY_CATEGORIES = gql`
	query GetExpenseByCategories($walletId: ID!, $startDate: String!, $endDate: String!) {
  		getExpenseByCategories(walletId: $walletId, startDate: $startDate, endDate: $endDate) {
  		  categoryName
  		  transactionCount
  		  totalAmount
  		}
	}
`