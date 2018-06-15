// @flow
import fs from 'fs';

// https://github.com/prismagraphql/prisma-binding/issues/187#issuecomment-397375066

const paths = [
  'database/__generated__/database.graphql.js',
  'server/api/__generated__/api.graphql.js',
];

paths.forEach(path => {
  let text = fs.readFileSync(path, 'utf8');
  text = text
    .replace(
      'export const Prisma: BindingConstructor<Prisma>',
      'export const prisma: BindingConstructor<Prisma>',
    )
    .replace(
      'import { GraphQLResolveInfo, GraphQLSchema }',
      `// $FlowFixMe
import { GraphQLResolveInfo, GraphQLSchema }`,
    )
    .replace(
      'import { IResolvers }',
      `// $FlowFixMe
import { IResolvers }`,
    )
    .replace(
      'import { Options }',
      `// $FlowFixMe
import { Options }`,
    );
  fs.writeFileSync(path, text);
});

console.log('Codegen fixed.');
