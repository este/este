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
  text = text
    // Fix Flow errors.
    .replace(
      'import type { IResolvers } from',
      `// $FlowFixMe
import type { IResolvers } from`,
    )
    // Export Prisma interface instead of BindingConstructor shit which does
    // not work for some foking damn reason.
    .replace('interface Prisma {', 'export interface Prisma {')
    .replace('export { prisma as Prisma }', '')
    .replace(
      'export type ID_Input = string | number',
      'export type ID_Input = string',
    );

  const isServerApi = path.indexOf('server/api') !== -1;
  if (isServerApi) {
    text = text
      .replace(
        `import type { Options } from 'graphql-binding'`,
        `import type { Context } from '../index'`,
      )
      .replace(/options\?: Options/g, 'context: Context');
  } else {
    text = text.replace(
      'import type { Options }',
      `// $FlowFixMe
import type { Options }`,
    );
  }

  fs.writeFileSync(path, text);
});

// eslint-disable-next-line no-console
console.log('Codegen fixed.');
