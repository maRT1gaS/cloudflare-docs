if (document.readyState !== 'loading') init();
else addEventListener('DOMContentLoaded', init);

function setter(isDark: boolean) {
  try {
    let theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('theme', theme);
    localStorage.theme = JSON.stringify({ theme });
  } catch (err) {
    // security error
  }
}

function init() {
  let media;

  try {
    media = window.matchMedia('(prefers-color-scheme:dark)');
    media.onchange = ev => setter(ev.matches);
  } catch (err) {
    // no support
  }

  try {
    let value = localStorage.theme;
    let row = value && JSON.parse(value);

    setter(row ? /light|dark/.test(row.theme) : media ? media.matches : false);
  } catch (err) {
    // security error
  }
}
