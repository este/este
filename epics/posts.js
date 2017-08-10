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

// Not all mutations need to be handled with Redux and observables.
// Take a look at DeletePostButton. Because mutation is optimistic, we don't
// have to handle async states.
export const createPost: Epic = (action$, { getEnvironment }) =>
  action$.filter(action => action.type === 'CREATE_POST').mergeMap(action => {
    // https://flow.org/en/docs/lang/refinements
    if (action.type !== 'CREATE_POST') throw Error();
    const { authorId, viewerId } = action; // type refinement
    return Observable.of(action.fields)
      .mergeMap(validatePost)
      .mergeMap(fields =>
        CreatePostMutation.commit(getEnvironment(), viewerId, authorId, fields),
      )
      .mapTo({ type: 'CREATE_POST_SUCCESS' })
      .catch((errors: Errors<PostFormFields>) =>
        Observable.of({ type: 'CREATE_POST_ERROR', errors }),
      );
  });
