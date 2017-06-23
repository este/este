// @flow
import LocaleLink from './locale-link';
import Text, { type TextProps } from './text';

type AProps = TextProps & {
  href: string,
  isActive?: boolean,
  prefetch?: boolean,
};

const A = ({ href, isActive, prefetch, ...props }: AProps) => {
  const { as = 'a', color = 'primary', style, ...restProps } = props;
  return (
    <LocaleLink href={href} prefetch={prefetch}>
      <Text
        {...{
          as,
          color,
          decoration: isActive ? 'underline' : 'none',
          style: {
            ':hover': { textDecoration: 'underline' },
            ...style,
          },
          ...restProps,
        }}
      />
    </LocaleLink>
  );
};

export default A;
