---
title: Available fields and functions
pcx-content-type: reference
weight: 2
meta:
  title: Available fields and functions for HTTP response header modification
---

# Available fields and functions for HTTP response header modification

The available fields when setting an HTTP response header value using an expression are the following:

{{<render file="_header-modification-fields.md">}}

Use the `to_string()` function to get the string representation of a non-string value like an Integer value. For example, `to_string(cf.bot_management.score)`.

Refer to [Fields](/firewall/cf-firewall-language/fields) for reference information on these fields.

{{<Aside type="warning" header="Important">}}
To obtain the value of an HTTP request header using the [`http.request.headers`](/firewall/cf-firewall-language/fields#field-http-request-headers) field, specify the header name in **lowercase**.

For example, to get the first value of the `Accept-Encoding` request header in an expression, use: `http.request.headers["accept-encoding"][0]`.
{{</Aside>}}

For information on the available functions, refer to [Functions](/firewall/cf-firewall-language/functions).
