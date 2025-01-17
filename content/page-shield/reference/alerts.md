---
title: Alerts
weight: 1
pcx-content-type: reference
meta:
  title: Page Shield alerts
---

# Page Shield alerts

Refer to [Configure Page Shield alerts](/page-shield/use-dashboard/configure-alerts/) for instructions on configuring alerts.

## Basic alerts

{{<Aside type="note">}}
Available for Cloudflare customers on a Business or Enterprise plan.
{{</Aside>}}

- **New Script Alert**: Triggered daily by any new JavaScript dependencies detected in your pages.
- **New Domain Alert**: Triggered hourly by newly detected JavaScript dependencies from new host domains.

## Malicious code alerts

{{<Aside type="note">}}
Available as a paid add-on for Cloudflare customers on an Enterprise plan.
{{</Aside>}}

- **Malicious Domain Alert**: Triggered immediately by JavaScript dependencies loaded from domains known to be malicious according to threat intelligence feeds.
- **Malicious URL Alert**: Triggered immediately by JavaScript dependencies loaded from URLs known to be malicious according to threat intelligence feeds.
- **Malicious Code Alert**: Triggered immediately by JavaScript code that Cloudflare's internal systems considered as malicious.
- **Code Change Alert**: Triggered daily by detected changes in existing JavaScript code.
