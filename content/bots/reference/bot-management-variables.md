---
weight: null
pcx-content-type: reference
title: Bot Management variables
---

# Bot Management variables

Bot Management provides access to several [new variables](/firewall/cf-firewall-language/fields#dynamic-fields) within the Firewall expression builder.

- **Bot Score**: An integer used to isolate bot requests which ranges from 1-99. Lower scores usually indicate automated traffic, while higher scores indicate human traffic. Most traffic scored below 30 comes from bots.
- **Verified Bot**: A boolean value that is true if the request comes from a good bot, like Google or Bing. Most customers choose to allow this traffic. For more details, see [Traffic from known bots](/firewall/known-issues-and-faq#how-does-firewall-rules-handle-traffic-from-known-bots).
- **Serves Static Resource**: An identifier that matches [file extensions](/bots/reference/static-resources/) for many types of static resources. Use this variable if you send emails that retrieve static images.

These variables are also available as part of the [request.cf](/workers/reference/apis/request/#the-cf-object) object via [Cloudflare Workers](/workers/):

- `request.cf.botManagement.score`
- `request.cf.botManagement.verifiedBot`
- `request.cf.botManagement.staticResource`
