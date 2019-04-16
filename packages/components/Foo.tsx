import React, { FunctionComponent } from 'react';
import { Text } from 'react-native';

interface FooProps {
  name: string;
}

const Foo: FunctionComponent<FooProps> = props => {
  return <Text>{props.name}</Text>;
};

export default Foo;
