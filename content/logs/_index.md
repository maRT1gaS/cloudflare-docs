---
title: Overview
weight: 0
pcx-content-type: landing-page
meta:
  title: Cloudflare Logs
---

# Cloudflare Logs

Cloudflare Enterprise customers have access to detailed logs of the metadata generated by our products. These logs are helpful for debugging, identifying configuration adjustments, and creating analytics, especially when combined with logs from other sources, such as your application server. For information about the types of data Cloudflare collects, refer to [Cloudflare's Data Products](/fundamentals/data-products).

Push your request or event logs to your cloud service provider using [Logpush](/logs/get-started/), which can be configured via the Cloudflare dashboard or API.

If you only want to see logs of HTTP requests, you can also use [Logpull](/logs/logpull/). The data from **Logpull** and **Logpush** is exactly the same.

Note that by default, Cloudflare does not retain your HTTP request logs. If you're a Spectrum customer, logs of Spectrum events are retained automatically.
