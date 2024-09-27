const userTypeDef = `#graphql
  type User {
    _id: ID!
    username: String!
    name: String!
    email: String!
  }

  type Query {
    authUser: User
    user(userId:ID!): User
  }

  type Mutation {
    signUp(input: SignUpInput!): User
    # login(input: LoginInput!): User
    # logout: LogoutResponse
  }

  input SignUpInput {
    username: String!
    name: String!
    email: String!
    password: String!
    confirmPassword: String!

  }

  # input LoginInput {
  #   username: String!
  #   password: String!
  # }

  # type LogoutResponse {
  #   message: String!
  # }
`;

export default userTypeDef;