// TODO: Wait once Relay Modern be ready for SSR in Next.js
// const fetch = require('node-fetch');
// const fs = require('fs');
//
// const {
//   buildClientSchema,
//   introspectionQuery,
//   printSchema,
// } = require('graphql/utilities');
//
// fetch('https://api.graph.cool/relay/v1/cj157d6lgacrd01553jnd34tv', {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ query: introspectionQuery }),
// })
//   .then(res => res.json())
//   .then(res => {
//     const schemaString = printSchema(buildClientSchema(res.data));
//     fs.writeFileSync('./data/schema.graphql', schemaString);
//   });
