// mobile sidebar toggle
export function mobile() {
  let root = document.documentElement;
  let btn = document.querySelector('.DocsMobileTitleHeader--sidebar-toggle-button')
  if (btn) btn.addEventListener('click', () => {
    root.toggleAttribute('is-mobile-sidebar-open');
  });
}