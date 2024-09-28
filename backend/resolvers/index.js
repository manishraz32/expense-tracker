import { mergeResolvers } from "@graphql-tools/merge";

import userResolver from "./user.resolver.js";
import walletResolver from "./wallet.resolver.js";
import budgetResolver from "./budget.resolver.js";
// import transactionResolver from "./transaction.resolver.js";

const mergedResolvers = mergeResolvers([userResolver, walletResolver, budgetResolver]);

export default mergedResolvers;
