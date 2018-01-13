// @flow
import createReactContext, { type Context } from 'create-react-context';
import type { EditorDispatch } from './Editor';

type Value = EditorDispatch;

const value = () => {};

const EditorDispatchContext: Context<Value> = createReactContext(value);

export const EditorDispatchProvider = EditorDispatchContext.Provider;

export default EditorDispatchContext.Consumer;
