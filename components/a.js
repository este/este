// @flow
import Text, { type TextProps } from './text';

type AProps = TextProps & {
  isActive?: boolean,
};

const A = (props: AProps) => (
  <Text
    as="a" // render text as a
    style={(theme, mixStyles) => {
      // set default A props
      const {
        color = 'primary',
        isActive = false,
        rawStyle: propsRawStyle,
        ...restProps
      } = mixStyles(props);
      return {
        ...restProps, // Remember, A has all Text and Box props.
        color,
        ...(isActive ? { decoration: 'underline' } : null),
        // raw styles are platform specific
        rawStyle: {
          ':hover': { textDecoration: 'underline' },
          // Do not forget for raw styles from props.
          ...propsRawStyle,
        },
      };
    }}
  />
);

export default A;
