import { gql } from "@apollo/client";

export const CREATE_WALLET = gql`
	mutation CreateWallet($input: SignUpInput!) {
		createWallet(input: $input) {
            _id
            walletName
            initialBalance
            userId
		}
	}
`;
