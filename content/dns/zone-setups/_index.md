---
weight: 2
pcx-content-type: concept
title: Zone setups
---

# Zone setups

When using Cloudflare DNS, you have three setup options:

*   [Full setup](/dns/full-setup/) (most common): Cloudflare is your primary DNS provider and also provides authoritative nameservers for your domain.
*   [Partial (CNAME) setup](/dns/partial-setup/): Cloudflare is your primary DNS provider but **does not** provide your authoritative nameservers.
*   [Secondary DNS](/dns/secondary-dns/): Cloudflare is not your primary DNS provider, but serves read-only DNS records to increase redundancy and resiliency.

{{<Aside type="note" header="Note:">}}
If you run your own authoritative nameservers but still want to benefit from Cloudflare's DDoS protection, check out [DNS Firewall](/dns/dns-firewall/).
{{</Aside>}}
