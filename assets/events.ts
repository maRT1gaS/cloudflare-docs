// mobile sidebar toggle
export function mobile() {
  let root = document.documentElement;
  let btn = document.querySelector('.DocsMobileTitleHeader--sidebar-toggle-button')
  if (btn) btn.addEventListener('click', () => {
    root.toggleAttribute('is-mobile-sidebar-open');
  });
}

// add focus attribute to activeElement if keyboard trigger
export function focus() {
  let attr = 'is-focus-visible';

  let isTAB = false;
  addEventListener('keydown', ev => {
    isTAB = ev.which === 9;
  });

  addEventListener('focusin', ev => {
    if (isTAB) (ev.target as HTMLElement).setAttribute(attr, '');
  });

  addEventListener('focusout', ev => {
    (ev.target as HTMLElement).removeAttribute(attr);
  });
}
