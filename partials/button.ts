import clsx from 'clsx';

import type { Template } from 'bongo';

interface Props {
  $slot?: string;
  className?: string;
  type?: string;
  href?: string;
}

const button: Template.Compiler<Props> = function (args) {
  let className = clsx(
    'Button',
    args.type === 'primary' && 'Button-is-docs-primary',
    args.type === 'secondary' && 'Button-is-docs-secondary',
    args.className,
  );

  return args.href
    ? `<a href="${args.href}" class="${className}">${ args.$slot }</a>`
    : `<button class="${className}">${ args.$slot }</button>`;
};

export default button;
