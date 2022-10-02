import clsx from 'clsx';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type PageTitleProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

export function PageTitle({ className, ...restProps }: PageTitleProps) {
  return <h1 className={clsx('text-left text-2xl uppercase font-bold font-sans my-10', className)} {...restProps} />;
}
