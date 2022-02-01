---
weight: 2
pcx-content-type: how-to
hidden: true
title: Protect your origin server — Enterprise
---

# Protect your origin server — Enterprise

{{<render file="_origin-health-overview.md">}}

## Secure origin connections

When you secure origin connections, it prevents attackers from discovering and overloading your origin server with requests.

- **DNS**: Set up [proxied (orange-clouded) DNS records](https://support.cloudflare.com/hc/articles/200169626) and [change your domain nameservers](https://support.cloudflare.com/hc/articles/205195708), which will also require that you [allow Cloudflare IP addresses](https://support.cloudflare.com/hc/articles/201897700) at your origin.
- **SSL**:
  - To encrypt all traffic between Cloudflare and your server, [choose Strict (SSL-Only Origin Pull)](/ssl/origin-configuration/ssl-modes#strict-ssl-only-origin-pull) SSL/TLS mode (requires server configuration)
  - To validate requests are coming from the Cloudflare network, [set up authenticated origin pulls](/ssl/origin-configuration/authenticated-origin-pull).
- **Cloudflare Tunnel**: To encrypt all traffic and prevent any inbound connections to your origin, [set up a Cloudflare Tunnel](/cloudflare-one/connections/connect-apps).

## Monitor origin health

For passive monitoring, [create notifications](/fundamentals/notifications/configure-create/create-notifications/) for **Origin Error Rate Alerts** to receive alerts when your origin returns 5xx codes above a configurable threshold and **Passive Origin Monitoring** to see when Cloudflare is unable to reach your origin for a few minutes.

{{<render file="_origin-health-check.md">}}

{{<render file="_origin-lb-alert.md">}}

## Reduce origin traffic

### Block traffic

{{<render file="_origin-ddos.md">}}

{{<render file="_origin-firewall-options.md">}}

### Increase caching

{{<render file="_origin-caching.md">}}

### Distribute traffic

{{<render file="_origin-load-balancing.md">}}

{{<render file="_origin-waiting-room.md">}}
