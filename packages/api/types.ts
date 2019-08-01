import { Models } from './models';
import { NexusGenAllTypes } from './generated/nexus';

// Only not generated types here.
// For generated types, use `import { NexusGenAllTypes } from '../generated/nexus'`

export interface Context {
  models: Models;
}

export interface WebSocketConnectionParams {
  token: string | null;
  host: string;
}

export interface WebSocketConnectionContext {
  user: NexusGenAllTypes['User'];
  host: string;
}
