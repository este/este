// @flow
import type { Epic, Errors } from '../types';
import type { PostFormFields } from '../reducers/posts';
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

export const createPost: Epic = (action$ /* , { environment } */) =>
  action$.filter(action => action.type === 'CREATE_POST').mergeMap(action => {
    // https://flow.org/en/docs/lang/refinements
    if (action.type !== 'CREATE_POST') throw Error();

    return Observable.of(action.fields)
      .mergeMap(validatePost)
      .mapTo({ type: 'CREATE_POST_SUCCESS' })
      .catch((errors: Errors<PostFormFields>) =>
        Observable.of({ type: 'CREATE_USER_ERROR', errors }),
      );
    // console.log(environment);
    // CreatePostMutation.commit? proc?
    // vracet promisu?
    // environment jako deps, pac vse pujde pres action, protoze async, ok
    // import CreatePostMutation from '../mutations/CreatePostMutation';
    // odpalit akci, a v epicu handlovat mutation
    // CreatePostMutation.commit(environment, text)

    // // Validate object first, then app rules, then do async.
    // return Observable.of(user)
    //   .mergeMap(validateUser)
    //   .mergeMap(validateUsersLocalLength(getState().users.local))
    //   .mergeMap(simulateUserSave)
    //   .mapTo({ type: 'CREATE_USER_SUCCESS', user })
  });
