// @flow
import * as React from 'react';

type Element<Type, Children, Style> = {|
  type: Type,
  props: {|
    children: Children,
    style?: Style,
  |},
|};

type Text = Element<
  'Text',
  Array<Text | string>,
  {|
    fontStyle?: string,
    fontWeight?: string,
  |},
>;

type View = Element<
  'View',
  Array<View | Text>,
  {|
    alignContent?:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'stretch'
      | 'space-between'
      | 'space-around',
  |},
>;

export type Content = View;

type EditorContentProps = {
  content: Content,
};

// Not sure why Flow inference doesn't work. It probably needs a refinements.
// https://flow.org/en/docs/lang/refinements
const render = (content: any) => {
  const { props: { children, style } } = content;
  const props = style ? { style } : null;
  const childrenComponents = children.map(child => {
    if (typeof child === 'string') return child;
    return render(child);
  });
  return React.createElement('div', props, ...childrenComponents);
};

const EditorContent = ({ content }: EditorContentProps) => render(content);

export default EditorContent;
