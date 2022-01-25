// Sidebar navlink expansions
// ---

export function init() {
  document.querySelectorAll<HTMLButtonElement>('.DocsSidebar--nav-expand-collapse-button').forEach(btn => {
    let item = btn.parentNode; // .DocsSidebar--nav-item
    if (item) item.addEventListener('click', toggle);
  });
}

function toggle(ev: Event) {
  let attr = 'is-expanded';

  let item = (ev.target as HTMLLIElement).closest('li')!;
  let isExpanded = item.hasAttribute(attr);

  let aria = item.querySelector('span[is-visually-hidden]');
  aria!.textContent = isExpanded ? 'Expand' : 'Collapse';

  let container = item.querySelector('div')!; // .DocsSidebar--nav-item-collapse-container
  container.className = 'DocsSidebar--nav-item-collapse-container';
  container.style.cssText = 'min-height:0px;transition-duration:400ms;height:0';

  if (isExpanded) {
    // minimize
    item.removeAttribute(attr);
  } else {
    // expand
    item.setAttribute(attr, '');

    let wrapper = container.firstElementChild!; // .DocsSidebar--nav-item-collapse-wrapper
    setTimeout(() => container.style.height = wrapper.clientHeight + 'px', 1);
    setTimeout(() => container.classList.add('DocsSidebar--nav-item-collapse-entered'), 400);
  }
}
