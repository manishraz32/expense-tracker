const walletTypeDef = `#graphql
  type Wallet {
    _id: ID!
    walletName: String!
    initialBalance: Float!  # Use Float for numbers with decimals
    userId: ID!             # This can also be a reference to a User type if needed
  }

  type Query {
    getWallet(id: ID!): Wallet
  }

  type Mutation {
    createWallet(input: WalletInput): Wallet  
  }

  input WalletInput {
    walletName: String!
    initialBalance: Float!  # Use Float instead of Number
    userId: ID!             # ID type for the user reference
  }

  # You can uncomment this if needed
  # type LogoutResponse {
  #   message: String!
  # }
`;

export default walletTypeDef;
