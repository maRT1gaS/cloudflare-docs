---
weight: 11
layout: list
type: example
summary: Respond to the Worker request with the response from another website
  (example.com in this example).
demo: https://respond-with-another-site.workers-sites-examples.workers.dev
tags:
  - Middleware
pcx-content-type: configuration
title: Respond with another site
---

# Respond with another site

{{<content-column>}}
  <p>{props.frontmatter.summary}</p>
{{</content-column>}}

```js
addEventListener('fetch', function (event) {
  event.respondWith(handleRequest(event.request));
});
async function handleRequest(request) {
  // Only GET requests work with this proxy.
  if (request.method !== 'GET') return MethodNotAllowed(request);
  return fetch(`https://example.com`);
}
function MethodNotAllowed(request) {
  return new Response(`Method ${request.method} not allowed.`, {
    status: 405,
    headers: {
      Allow: 'GET',
    },
  });
}
```

## Demo

<p>
  <a href={props.frontmatter.demo}>Open demo</a>
</p>

\<Demo src={props.frontmatter.demo} title={props.frontmatter.summary} aspectRatio={16 / 9} />
