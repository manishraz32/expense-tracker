import { mergeResolvers } from "@graphql-tools/merge";

import userResolver from "./user.resolver.js";
import walletResolver from "./wallet.resolver.js";
// import transactionResolver from "./transaction.resolver.js";

const mergedResolvers = mergeResolvers([userResolver, walletResolver]);

export default mergedResolvers;
