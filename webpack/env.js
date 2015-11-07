// Sets NODE_ENV based on presence of -p argument
process.env.NODE_ENV = process.argv.indexOf( '-p' ) === -1 ? 'development' : 'production';

console.log( 'Setting NODE_ENV to ' + process.env.NODE_ENV );
