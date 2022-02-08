export function get(href: string): XMLHttpRequest {
  var req = new XMLHttpRequest();
  req.open('GET', href, req.withCredentials = true);
  req.responseType = 'text';
  req.send();
  return req;
}

let timer: NodeJS.Timeout | void;
export function render(link: URL, html: string) {
  if (timer) {
    timer = clearTimeout(timer);
  }

  document.open();
  document.write(html);
  document.close();

  let loc = link.pathname + link.search + link.hash;
  history.pushState(null, document.title, loc);

  timer = setTimeout(() => {
    let elem = link.hash && document.getElementById(
      link.hash.substring(1) // handles `#5a-example` case
    );

    if (elem) elem.scrollIntoView(true);
    else window.scrollTo(0, 0);
  }, 100);
}
