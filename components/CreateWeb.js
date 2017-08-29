// @flow
import React from 'react';
import Form from './Form';
import { CreateButton } from './buttons';
import TextInputBig from './TextInputBig';
import { FormattedMessage } from 'react-intl';
import Text from './Text';
import Set from './Set';
import nameToDomain from '../lib/nameToDomain';

// const signIn = () => null;

// {nameToDomain(name)}
// const isV

class CreateWeb extends React.Component<{}, { name: string }> {
  state = {
    name: '',
  };

  getDomain() {
    return nameToDomain(this.state.name);
  }

  handleNameChange = (name: string) => {
    this.setState({ name });
  };

  handleSubmit = () => {
    // const domain = this.getDomain();
    // console.log(domain);
  };

  render() {
    const domain = this.getDomain();
    const { name } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <TextInputBig
          label={
            <Text>
              <FormattedMessage
                defaultMessage="Web Name"
                id="createApp.label"
              />
            </Text>
          }
          autoFocus
          onChange={this.handleNameChange}
          type="text"
          value={name}
        />
        <Set>
          <CreateButton primary disabled={!domain} />
        </Set>
      </Form>
    );
  }
}

export default CreateWeb;
