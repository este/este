import Persistence from './Persistence';

export default function reviveStateFromPersistence(appState, persistenceStore) {
  const persistence = new Persistence({}).toSeq()
    .reduce((previous, value, key) => ({...previous, [key]: persistenceStore.get(key) || value}), {});

  return {...appState, persistence};
}
