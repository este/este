// @flow
import 'rxjs';
import type { Action, Dependencies, State } from '../types';
import type { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { values } from 'ramda';

import * as usersEpics from './users/epics';
import * as authEpics from './auth/epics';

const importedEpics = {
  ...usersEpics,
  ...authEpics,
};

const epics = values(importedEpics).filter(item => typeof item === 'function');

const rootEpic = (
  action$: Observable<Action>,
  { getState }: { getState: () => State },
  dependencies: Dependencies,
) => combineEpics(...epics)(action$, { ...dependencies, getState });

export default rootEpic;
