import { gql } from "@apollo/client";

export const CREATE_WALLET = gql`
	mutation CreateWallet($input: WalletInput!) {
		createWallet(input: $input) {
            id
            userId
            walletName
            initialBalance
            currency
            spentSoFar
            moneyAddedSoFar
            moneyLeft
            changeTillNow
            createdAt
            updatedAt
		}
	}
`;
