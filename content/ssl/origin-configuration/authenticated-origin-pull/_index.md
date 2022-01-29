---
weight: 4
pcx-content-type: navigation
title: Authenticated origin pull
---

# Authenticated origin pull

Authenticated origin pulls ensure requests to your origin server come from the Cloudflare network.

This authentication becomes particularly important with the Cloudflare Web Application Firewall (WAF). Together with the WAF, you can make sure that **all traffic** is evaluated before receiving a response from your origin server.

If you want your domain to be FIPS compliant, you must [upload your own certificate](/ssl/set-up/#per-hostname--customer-certificates).

{{<button-group>}}
{{<button type="primary" href="/ssl/set-up/">}}
Get started
{{</button>}}
{{<button type="secondary" href="/ssl/explanation/">}}
Learn more
{{</button>}}
{{</button-group>}}

{{<Aside type="warning" header="Important">}}
Authenticated Origin Pull is incompatible with Railgun.
{{</Aside>}}
