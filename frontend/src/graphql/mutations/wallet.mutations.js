import { gql } from "@apollo/client";

export const CREATE_WALLET = gql`
	mutation CreateWallet($input: WalletInput!) {
		createWallet(input: $input) {
            _id
            walletName
            initialBalance
            userId
		}
	}
`;
