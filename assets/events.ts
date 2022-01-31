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

export function dropdowns() {
  let attr = 'data-expanded';

  addEventListener('focusin', console.log);

  document.querySelectorAll('.Dropdown').forEach(div => {
    let btn = div.querySelector('button');

    if (btn) {
      let clickaway: EventListener = ev => {
        ev.stopPropagation();
        removeEventListener('click', clickaway);
        div.setAttribute(attr, 'false');
        btn.setAttribute(attr, 'false');
      }

      btn.addEventListener('click', ev => {
        if (div.getAttribute(attr) === 'true') {
          clickaway(ev);
        } else {
          ev.stopPropagation();
          addEventListener('click', clickaway);
          div.setAttribute(attr, 'true');
          btn.setAttribute(attr, 'true');
          // TODO: focus first
          // TODO: keyboard listeners
        }
      });
    }
  });
}