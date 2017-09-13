// This should be auto generated soon.

// // createWeb
// const isValidName = name => {
//   return (
//     name.length >= 3 &&
//     name.length <= 140
//   );
// }
//
// const isValidDomain = domain => {
//   return (
//     isValidName(domain) &&
//     /^[a-z0-9]+$/.test(domain)
//   );
// }
//
// module.exports = function (event) {
//   if (!isValidName(event.data.name)) {
//     return { error: `${event.data.name} is not a valid web name.` }
//   }
//   if (!isValidDomain(event.data.domain)) {
//     return { error: `${event.data.domain} is not a valid web domain.` }
//   }
//
//   const timestamp = Date.now().toString(36);
//   event.data.domain = `${event.data.domain}-${timestamp}`;
//   return {data: event.data}
// }
//
