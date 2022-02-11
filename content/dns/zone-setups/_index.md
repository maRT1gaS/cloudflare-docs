---
pcx-content-type: concept
title: Zone setups
weight: 3
---

# Zone setups

When using Cloudflare DNS, you have three setup options:

*   [Full setup](/dns/full-setup/) (most common): Use Cloudflare as your primary DNS provider and manage your DNS records on Cloudflare.
*   [Partial (CNAME) setup](/dns/partial-setup/): Keep your primary DNS provider and only use Cloudflare's reverse proxy for individual subdomains.
*   [Secondary DNS](/dns/secondary-dns/): Keep your primary DNS provider and use Cloudflare as a secondary DNS provider. DNS records will be transferred from your primary DNS provider to Cloudflare via zone transfer using [AXFR](https://datatracker.ietf.org/doc/html/rfc5936) or [IXFR](https://datatracker.ietf.org/doc/html/rfc1995).

{{<Aside type="note" header="Note:">}}

If you run your own authoritative nameservers but still want to benefit from Cloudflare's global Anycast network, check out [DNS Firewall](/dns/dns-firewall/).

{{</Aside>}}