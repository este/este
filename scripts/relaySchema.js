// $flow
// TODO: Use https://github.com/graphcool/get-graphql-schema
const fetch = require('node-fetch');
const fs = require('fs');
const { GRAPHQL_ENDPOINT } = require('../env-config');

const {
  buildClientSchema,
  introspectionQuery,
  printSchema,
} = require('graphql/utilities');

fetch(GRAPHQL_ENDPOINT, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: introspectionQuery }),
})
  .then(res => res.json())
  .then(res => {
    const schemaString = printSchema(buildClientSchema(res.data));
    fs.writeFileSync('./data/schema.graphql', schemaString);
  });
