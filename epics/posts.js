// @flow
import type { Epic, Errors } from '../types';
import type { PostFormFields } from '../reducers/posts';
import CreatePostMutation from '../mutations/CreatePostMutation';
import DeletePostMutation from '../mutations/DeletePostMutation';
import validate, { required, minLength, maxLength } from '../lib/validate';
import { Observable } from 'rxjs/Observable';

const validatePost = fields => {
  const validationErrors = validate(fields, {
    text: [required(), minLength(), maxLength()],
  });
  return validationErrors
    ? Observable.throw(({ validationErrors }: Errors<PostFormFields>))
    : Observable.of(fields);
};

export const createPost: Epic = (action$, { getEnvironment }) =>
  action$.filter(action => action.type === 'CREATE_POST').mergeMap(action => {
    // https://flow.org/en/docs/lang/refinements
    if (action.type !== 'CREATE_POST') throw Error();
    const { viewerId } = action; // type refinement
    return Observable.of(action.fields)
      .mergeMap(validatePost)
      .mergeMap(fields =>
        CreatePostMutation.commit(getEnvironment(), viewerId, fields),
      )
      .mapTo({ type: 'CREATE_POST_SUCCESS' })
      .catch((errors: Errors<PostFormFields>) =>
        Observable.of({ type: 'CREATE_POST_ERROR', errors }),
      );
  });

export const deletePost: Epic = (action$, { getEnvironment }) =>
  action$.filter(action => action.type === 'DELETE_POST').mergeMap(action => {
    // https://flow.org/en/docs/lang/refinements
    if (action.type !== 'DELETE_POST') throw Error();
    const { id, viewerId } = action;
    return Observable.fromPromise(
      DeletePostMutation.commit(getEnvironment(), viewerId, id),
    )
      .mapTo({ type: 'DELETE_POST_SUCCESS', id })
      .catch((errors: Errors<PostFormFields>) =>
        Observable.of({ type: 'DELETE_POST_ERROR', id, errors }),
      );
  });
