import { gql } from "@apollo/client";

export const ADD_EXPENCE_TRANSACTION = gql`
	mutation AddExpenceTransaction($input: TransactionInput!) {
		createTransaction(input: $input) {
			_id
            amount
            createdAt
            transactionDate
            transactionType
            updatedAt
            userId
            walletId
		}
	}
`;
