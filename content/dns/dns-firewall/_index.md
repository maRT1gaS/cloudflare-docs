---
pcx-content-type: overview
title: DNS Firewall
weight: 9
---

# DNS Firewall

Cloudflare DNS Firewall proxies all DNS queries to your nameservers through Cloudflare’s global edge network. This action protects upstream nameservers from DDoS attack and reduces load by caching DNS responses.

DNS Firewall is for customers who need to speed up and protect full nameservers, while [authoritative DNS](/dns/zone-setups/full-setup/) is for customers who need to speed up and protect individual zones.

## How it works

When a DNS query goes to your nameservers:

1.  Queries go to the closest Cloudflare data center to the website visitor.
2.  Cloudflare tries to return a response from DNS cache.
3.  If the cache is not available, Cloudflare queries the provider's nameservers.
4.  Cloudflare temporarily caches the response for subsequent DNS queries.

## Benefits

DNS Firewall provides the following benefits while allowing organizations total control over their DNS:

*   DDoS mitigation
*   High availability
*   Reliability
*   Global distribution
*   DNS caching
*   Bandwidth savings
*   Rate limiting per data center

## Availability

DNS Firewall is only available to customers on Enterprise plans.

## Resources

*   [Setup](/dns/setup/)
*   [Analytics](/dns/analytics/)
*   [FAQs](/dns/faq/)