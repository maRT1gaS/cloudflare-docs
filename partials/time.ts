import fromnow from 'fromnow';
import type { Template } from 'bongo';

const time: Template.Compiler<{ date: string }> = function (args) {
  let d = new Date(args.date);
  let text = fromnow(d, { max: 1 });
  let iso = d.toISOString();
  return `<time datetime="${iso}" title="${iso.substring(0, 10)}">${text} ago</time>`;
};

export default time;
