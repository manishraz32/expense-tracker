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
