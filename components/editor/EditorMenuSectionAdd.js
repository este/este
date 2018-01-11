// @flow
import * as React from 'react';
import { EditorMenuSection, EditorMenuButton } from './EditorMenu';
import type { Path } from './Editor';

type EditorMenuSectionAddProps = {|
  activePath: Path,
|};

class EditorMenuSectionAdd extends React.PureComponent<
  EditorMenuSectionAddProps,
> {
  getBackButtonProps() {
    const { activePath } = this.props;
    if (activePath.length === 0) return { section: 'page' };
    // Shallow clone enforces autoFocus.
    return { path: [...activePath] };
  }

  render() {
    return (
      <EditorMenuSection>
        <EditorMenuButton back {...this.getBackButtonProps()} />
      </EditorMenuSection>
    );
  }
}

export default EditorMenuSectionAdd;
