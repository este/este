// @flow
import fs from 'fs';

// This fixed generated code.
// https://github.com/prismagraphql/prisma-binding/issues/187#issuecomment-397375066

const paths = [
  'database/__generated__/database.graphql.js',
  'server/api/__generated__/api.graphql.js',
];

paths.forEach(path => {
  let text = fs.readFileSync(path, 'utf8');
  const isServerApi = path.indexOf('server/api') !== -1;
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
    );
  if (isServerApi) {
    text = text
      .replace(
        `import { Options } from 'graphql-binding'`,
        `import type { Context } from '../index'`,
      )
      .replace(/options\?\: Options/g, 'context: Context');
  } else {
    text = text.replace(
      'import { Options }',
      `// $FlowFixMe
import { Options }`,
    );
  }

  fs.writeFileSync(path, text);
});

console.log('Codegen fixed.');
