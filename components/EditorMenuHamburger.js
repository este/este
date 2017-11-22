// @flow
import * as React from 'react';
import { EditorMenuButton } from './EditorMenu';
import Box from './Box';
import Set from './Set';
import A from './A';
import { ManageYourWebsMessage } from '../pages';

type EditorMenuHamburgerProps = {||};

type EditorMenuHamburgerState = {|
  open: boolean,
|};

const initialState = {
  open: false,
};

const ToggleButton = props => <EditorMenuButton {...props}>☰</EditorMenuButton>;

class EditorMenuHamburger extends React.PureComponent<
  EditorMenuHamburgerProps,
  EditorMenuHamburgerState,
> {
  state = initialState;

  onHamburgerButtonPress = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  render() {
    return (
      <Box paddingLeft={1} alignItems="flex-end">
        <ToggleButton
          onPress={this.onHamburgerButtonPress}
          opacity={this.state.open ? 0.5 : 1}
        />
        {this.state.open && (
          <Set marginBottom={0} marginTop={1}>
            <A href={{ pathname: '/' }}>
              <ManageYourWebsMessage />
            </A>
          </Set>
        )}
      </Box>
    );
  }
}

export default EditorMenuHamburger;
