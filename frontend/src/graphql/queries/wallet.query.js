import { gql } from "@apollo/client"

export const GET_WALLET_BY_ID = gql`
    query GetWalletById($id: ID!) {
        getWalletById(id: $id) {
            _id
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
`