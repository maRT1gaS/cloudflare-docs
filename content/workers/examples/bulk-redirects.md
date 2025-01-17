---
weight: 1000
layout: list
type: example
summary: Redirect requests to certain URLs based on a mapped object to the
  request's URL.
tags:
  - Middleware
pcx-content-type: configuration
title: Bulk redirects
---

# Bulk redirects

{{<content-column>}}
  <p>{props.frontmatter.summary}</p>
{{</content-column>}}

```js
const externalHostname = 'examples.cloudflareworkers.com';

const redirectMap = new Map([
  ['/bulk1', 'https://' + externalHostname + '/redirect2'],
  ['/bulk2', 'https://' + externalHostname + '/redirect3'],
  ['/bulk3', 'https://' + externalHostname + '/redirect4'],
  ['/bulk4', 'https://google.com'],
]);

async function handleRequest(request) {
  const requestURL = new URL(request.url);
  const path = requestURL.pathname.split('/redirect')[1];
  const location = redirectMap.get(path);
  if (location) {
    return Response.redirect(location, 301);
  }
  // If request not in map, return the original request
  return fetch(request);
}

addEventListener('fetch', async event => {
  event.respondWith(handleRequest(event.request));
});
```
