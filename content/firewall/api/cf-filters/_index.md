---
pcx-content-type: reference
weight: 440
title: Cloudflare Filters API
---

# Cloudflare Filters API

**Cloudflare Filters** is an API-only component of Firewall Rules for designing complex criteria that rely on boolean operators and other logic to examine incoming HTTP traffic and look for a match.

For example, a filter matching:

*   An HTTP user agent, and
*   The HTTP path, and
*   The source IP address

May be associated with a firewall rule declaring that the request should be blocked.

Use Rules Lists within a filter to refer collectively to a group of IP addresses. Refer to the [Rules List API](/firewall/api/cf-lists/) for more information.

Before getting started with the Cloudflare Filters API, familiarize yourself with Firewall Rules [expressions](/firewall/cf-firewall-rules/fields-and-expressions/). For a complete reference, see [*Firewall Rules language*](/firewall/cf-firewall-language/).

## Differences from other Cloudflare APIs

The Firewall Rules API behaves differently from most Cloudflare APIs in two ways:

*   API calls accept and return multiple items, and allow applying data changes to multiple items.
*   Although API calls return the [standard response](https://api.cloudflare.com/#getting-started-responses), the error object follows the [JSON API standard](http://jsonapi.org/format/#errors), such that in an error condition, it is clear which item produced the error and why.

To get started, review [What is a filter?](/firewall/api/cf-filters/what-is-a-filter/), followed by the Cloudflare Filters [JSON object](/firewall/api/cf-firewall-rules/json-object/) and [Endpoints](/firewall/api/cf-firewall-rules/endpoints/).