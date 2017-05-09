// @flow
import Link from 'next/link';
import Text, { type TextProps } from './text';

type AProps = TextProps & {
  href: string,
  isActive?: boolean,
  prefetch?: boolean,
};

const A = ({ href, prefetch, ...props }: AProps) => {
  const {
    as = 'a',
    color = 'primary',
    isActive = false,
    style,
    ...restProps
  } = props;
  return (
    <Link href={href} prefetch={prefetch}>
      <Text
        {...{
          as,
          color,
          decoration: isActive ? 'underline' : 'none',
          href,
          style: {
            ':hover': { textDecoration: 'underline' },
            ...style,
          },
          ...restProps,
        }}
      />
    </Link>
  );
};

export default A;
