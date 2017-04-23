// @flow
import Link from 'next/link';
import Text, { type TextProps } from './text';

type AProps = TextProps & {
  href: string,
  isActive?: boolean,
  prefetch?: boolean,
};

const A = ({ href, prefetch, ...props }: AProps) => (
  <Link href={href} prefetch={prefetch}>
    <Text
      as="a"
      href={href}
      style={(theme, mixStyles) => {
        const {
          color = 'primary',
          isActive,
          rawStyle: propsRawStyle,
          ...textProps
        } = mixStyles(props);
        return {
          color,
          decoration: isActive ? 'underline' : 'none',
          rawStyle: {
            ':hover': { textDecoration: 'underline' },
            ...propsRawStyle,
          },
          ...textProps,
        };
      }}
    />
  </Link>
);

export default A;
