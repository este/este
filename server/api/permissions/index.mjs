// // @flow
// import { rule, shield, and, or, not } from 'graphql-shield';
//
// // Rules
//
// const isAuthenticated = rule()(async (parent, args, ctx, info) => {
//   return ctx.user !== null;
// });
//
// const isAdmin = rule()(async (parent, args, ctx, info) => {
//   return ctx.user.role === 'admin';
// });
//
// const isEditor = rule()(async (parent, args, ctx, info) => {
//   return ctx.user.role === 'editor';
// });
//
// // Permissions
//
// const permissions = shield({
//   Query: {
//     frontPage: not(isAuthenticated),
//     fruits: and(isAuthenticated, or(isAdmin, isEditor)),
//     customers: and(isAuthenticated, isAdmin),
//   },
//   Mutation: {
//     addFruitToBasket: isAuthenticated,
//   },
//   Fruit: isAuthenticated,
//   Customer: isAdmin,
// });
