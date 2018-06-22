// @flow
import graphqlShield from 'graphql-shield';
/*::
import * as generated from '../__generated__/api.graphql'
import type { Context } from '../index'
*/
// We can use also: or, not.
const { rule, shield, and, allow } = graphqlShield;

const isAuthenticated = rule()(async (
  parent,
  args,
  { userId, db } /*: Context */,
) => {
  return userId != null && db.exists.User({ id: userId });
});

const isWebCreator = getId =>
  rule()(async (parent, args, { userId, db } /*: Context */) => {
    if (userId == null) return false;
    return db.exists.Web({
      id: getId(args),
      creator: {
        id: userId,
      },
    });
  });

const isPageCreator = getId =>
  rule()(async (parent, args, { userId, db } /*: Context */) => {
    if (userId == null) return false;
    return db.exists.Page({
      id: getId(args),
      creator: {
        id: userId,
      },
    });
  });

// To check undefined resolvers. Interesting we can use $Keys on Flow interface.
// Unfortunately, we can't use $ObjMap.
// TODO: Update codegen somehow to generate exact types for 100% coverage.
// The ideal DX: 1) add resolver 2) Flow warn about missing or wrong permission.
/*::
type Rules = {|
  Mutation: { [$Keys<generated.Mutation>]: Function },
  Query: { [$Keys<generated.Query>]: Function },
|};
*/

const rules /*: Rules */ = {
  Mutation: {
    createWeb: isAuthenticated,
    deleteWeb: and(isAuthenticated, isWebCreator(args => args.input.id)),
    setTheme: isAuthenticated,
    setPageTitle: and(isAuthenticated, isPageCreator(args => args.input.id)),
  },
  Query: {
    me: allow,
    webs: allow,
    page: and(isAuthenticated, isPageCreator(args => args.id)),
    web: and(isAuthenticated, isWebCreator(args => args.id)),
  },
};

const permissions = shield(rules);

export default permissions;
