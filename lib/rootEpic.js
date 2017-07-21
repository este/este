// @flow
import 'rxjs';
import type { Action, Dependencies, State } from '../types';
import type { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { values } from 'ramda';

import * as authEpics from '../epics/auth';
import * as postsEpics from '../epics/posts';
import * as usersEpics from '../epics/users';

const importedEpics = {
  ...authEpics,
  ...postsEpics,
  ...usersEpics,
};

const epics = values(importedEpics).filter(item => typeof item === 'function');

const rootEpic = (
  action$: Observable<Action>,
  { getState }: { getState: () => State },
  dependencies: Dependencies,
) => combineEpics(...epics)(action$, { ...dependencies, getState });

export default rootEpic;
