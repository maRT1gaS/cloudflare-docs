---
pcx-content-type: reference
weight: 405
title: Firewall Rules API
---

# Firewall Rules API

Use the Firewall Rules API to programmatically manage your rules.

When working with the Firewall Rules API, refer to these topics for additional context:

*   [Actions](/firewall/cf-firewall-rules/actions/)
*   [Expressions](/firewall/cf-firewall-rules/fields-and-expressions/)
*   [Firewall Rules language](/firewall/cf-firewall-language/)
*   [Cloudflare Filters](/firewall/api/cf-filters/)

To get started with the API, review the Firewall Rules API [JSON object](/firewall/api/cf-firewall-rules/json-object/) and [Endpoints](/firewall/api/cf-firewall-rules/endpoints/).

## Differences from other Cloudflare APIs

The Firewall Rules API behaves differently from most Cloudflare APIs in two ways:

*   API calls accept and return multiple items, and allow applying data changes to multiple items.
*   Although API calls return the [standard response](https://api.cloudflare.com/#getting-started-responses), the error object follows the [JSON API standard](http://jsonapi.org/format/#errors), such that in an error condition, it is clear which item produced the error and why.
