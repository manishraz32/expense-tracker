const walletTypeDef = `#graphql

scalar Date

type Query {
    getWallets: [Wallet]
    getWalletById(id: ID!): Wallet
}

type Mutation {
    createWallet(input: WalletInput!): Wallet
    updateWallet(id: ID!, input: WalletInput!): Wallet
    deleteWallet(id: ID!): String
}

input WalletInput {
    userId: ID!
    walletName: String!
    initialBalance: Float!
    currency: String
    spentSoFar: Float
    moneyAddedSoFar: Float
}

type Wallet {
    id: ID!
    userId: ID!
    walletName: String!
    initialBalance: Float!
    currency: String!
    spentSoFar: Float!
    moneyAddedSoFar: Float!
    moneyLeft: Float!
    changeTillNow: Float!
    createdAt: Date!
    updatedAt: Date!
}`;

export default walletTypeDef;
