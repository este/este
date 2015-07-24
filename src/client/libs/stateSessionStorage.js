export function listenStateChange(state) {
    state.on('change', () =>
        window.sessionStorage.setItem('appState', JSON.stringify(state.save()))
    );
}

export function getPersistedState() {
    const stateStr = window.sessionStorage.getItem('appState');
    if (!stateStr) return null;

    try {
        return JSON.parse(stateStr);
    } catch(error) {
        console.error('Error while deserializing state from sessionStorage', error); // eslint-disable-line no-console
        return null;
    }
}
