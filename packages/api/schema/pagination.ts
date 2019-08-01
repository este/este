import { inputObjectType } from 'nexus';

// https://itnext.io/the-definitive-guide-to-handling-graphql-errors-e0c58b52b5e1

export const PageSubcriptionFilters = inputObjectType({
  name: 'PageSubcriptionFilters',
  definition(t) {
    t.id('rootDataId');
    t.int('first');
    t.int('skip', { default: 0 });
  },
});
