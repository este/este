export const ports = {
  api: 4000,
  // foo: 4001,
};

// I believe getEndpoint is not vulnerable, but who knows. Use whitelist.
// https://www.acunetix.com/blog/articles/automated-detection-of-host-header-attacks/
const hostsWhitelist = [
  'localhost:3000', // app
  `localhost:${ports.api}`, // api
  'este.steida.now.sh',
  'este.io',
];

type Endpoints = { [key in keyof typeof ports]: string };

let endpoints: Endpoints | null = null;

export const getEndpoint = (host: string): Endpoints => {
  if (hostsWhitelist.indexOf(host) === -1) throw new Error('Not allowed host');

  // Local host (localhost:3000, localhost:4000) has a port.
  const isLocal = host.indexOf(':') !== -1;

  if (endpoints == null) {
    // Partial<Endpoints> because we build it incrementally.
    endpoints = Object.keys(ports).reduce<Partial<Endpoints>>((acc, key) => {
      // TypeScript magic. Why it works and why we have to type it?
      const name = key as keyof typeof endpoints;
      const port = ports[name];
      const endpoint = isLocal
        ? `http://${host.replace(/:[0-9]+/, `:${port}`)}`
        : `https://${host}/_${name}`;
      return { ...acc, [name]: endpoint };
    }, {}) as Endpoints; // This looks like a type hack.
  }

  return endpoints;
};
