// @flow
import Mutation from './Mutation';
import Query from './Query';

// This is fix for codegen.
const mapSignatures = Resolvers => {
  const mapped = {};
  Object.keys(Resolvers).forEach(resolverName => {
    // $FlowFixMe I don't know.
    const resolver = Resolvers[resolverName];
    mapped[resolverName] = (parent, args, context, info) =>
      resolver(args, info, context);
  });
  return mapped;
};

export default {
  Mutation: mapSignatures(Mutation),
  Query: mapSignatures(Query),
};
