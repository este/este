import chalk from 'chalk';

export function logServer(...args) {
  log({
    color: 'blue',
    origin: 'server',
    messages: args
  });
}

export function logWebpack(...args) {
  log({
    color: 'magenta',
    origin: 'webpack',
    messages: args
  });
}

function log({color, origin, messages}) {
  if (!chalk[color]) throw new Error(`Unsupported log color '${color}'`);

  const coloredTime = chalk.white(dateAndTime());
  const coloredOrigin = chalk[color](`[${origin}]`);

  console.log(`${coloredTime} - ${coloredOrigin}`, chalk[color](...messages)); // eslint-disable-line no-console
}

function dateAndTime(dateObject = new Date()) {
  const day = dateObject.getDate();
  const monthShort = dateObject.toString().substr(4, 3);
  const time = dateObject.toString().substr(16, 8);

  return `${day} ${monthShort} ${time}`;
}
