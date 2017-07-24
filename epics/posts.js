// @flow
import type { Epic, Errors } from '../types';
import type { PostFormFields } from '../reducers/posts';
import CreatePostMutation from '../mutations/CreatePostMutation';
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

export const createPost: Epic = (action$, { environment }) =>
  action$.filter(action => action.type === 'CREATE_POST').mergeMap(action => {
    // https://flow.org/en/docs/lang/refinements
    if (action.type !== 'CREATE_POST') throw Error();
    const { viewerId } = action; // type refinement
    return Observable.of(action.fields)
      .mergeMap(validatePost)
      .mergeMap(fields =>
        CreatePostMutation.commit(environment, viewerId, fields),
      )
      .mapTo({ type: 'CREATE_POST_SUCCESS' })
      .catch((errors: Errors<PostFormFields>) =>
        Observable.of({ type: 'CREATE_USER_ERROR', errors }),
      );
  });
