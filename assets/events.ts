export function $focus(elem: HTMLElement, bool: boolean) {
  elem.toggleAttribute('is-focus-visible', bool);
  if (bool) elem.focus();
}

export function $tabbable(links: NodeListOf<Element>, bool: boolean) {
  for (let i=0; i < links.length; i++) {
    bool
      ? links[i].removeAttribute('tabindex')
      : links[i].setAttribute('tabindex', '-1');
  }
}

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
  let isTAB = false;
  addEventListener('keydown', ev => {
    isTAB = ev.which === 9;
  });

  addEventListener('focusin', ev => {
    if (isTAB) $focus(ev.target as HTMLElement, true);
  });

  addEventListener('focusout', ev => {
    $focus(ev.target as HTMLElement, false);
  });
}

export function dropdowns() {
  let attr = 'data-expanded';

  document.querySelectorAll('.Dropdown').forEach(div => {
    let btn = div.querySelector('button');
    let links = div.querySelectorAll<HTMLAnchorElement>('li>a');
    let focused = 0; // index

    if (btn && links.length > 0) {
      let arrows: EventListener = (ev: KeyboardEvent) => {
        let key = ev.which;
        let isTAB = key === 9;

        // ESCAPE ~> close
        if (key === 27) return close(ev);

        // DOWN / TAB ~> next
        if (isTAB || key === 40) focused++;
        // UP / SHIFT+TAB ~> prev
        else if (key === 38 || (isTAB && ev.shiftKey)) focused--;

        // loop focus around menu
        if (focused < 0) focused = links.length;
        else focused %= links.length;

        if (isTAB) ev.preventDefault();
        $focus(links[focused], true);
      };

      let close: EventListener = ev => {
        ev.stopPropagation();
        removeEventListener('click', close);

        // tab-inactive sublinks
        $tabbable(links, false);

        div.setAttribute(attr, 'false');
        btn.setAttribute(attr, 'false');

        div.removeEventListener('keydown', arrows);
      };

      let open: EventListener = ev => {
        ev.stopPropagation();
        addEventListener('click', close);

        // tab-friendly sublinks
        $tabbable(links, true);

        div.setAttribute(attr, 'true');
        btn.setAttribute(attr, 'true');

        // focus the first link
        $focus(links[focused=0], true);

        div.addEventListener('keydown', arrows);
      };

      btn.addEventListener('click', ev => {
        if (div.getAttribute(attr) === 'true') {
          close(ev);
        } else {
          open(ev);
        }
      });
    }
  });
}