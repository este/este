// @flow
import 'rxjs';
import type { Dependencies, State, Observable } from '../types';
import { combineEpics } from 'redux-observable';
import { values } from 'ramda';

import * as authEpics from '../epics/auth';

const importedEpics = {
  ...authEpics,
};

const epics = values(importedEpics).filter(item => typeof item === 'function');

const rootEpic = (
  action$: Observable,
  { getState }: { getState: () => State },
  dependencies: Dependencies,
) =>
  combineEpics(...epics)(action$, {
    ...dependencies,
    getState,
  });

export default rootEpic;
