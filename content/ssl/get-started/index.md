---
title: Get started
weight: 1
pcx-content-type: tutorial
meta:
  title: Get started with SSL/TLS
---

# Get started with SSL/TLS

Follow the steps below to enable SSL/TLS protection for your application.

---

## Prerequisites

- [Create an account and register an application](https://support.cloudflare.com/hc/articles/360059655691)

---

## Step 1 — Choose an edge certificate

Cloudflare offers a variety of options for your application's edge certificates:

- [**Universal certificates**](/ssl/edge-certificates/universal-ssl/): {{<render file="_universal-ssl-definition.md">}}
- [**Advanced certificates**](/ssl/edge-certificates/advanced-certificate-manager/) (which supercede legacy [Dedicated Certificates](https://support.cloudflare.com/hc/articles/228009108)): {{<render file="_acm-definition.md">}}
- [**Custom certificates**](/ssl/edge-certificates/custom-certificates/): {{<render file="_custom-certificates-definition.md">}}
- [**Keyless certificates**](/ssl/keyless-ssl/) (Enterprise only): {{<render file="_keyless-ssl-definition.md">}}

{{<Aside type="note" header="Note:">}}
  {{<render file="_ssl-for-saas-definition.md">}}
  For more details, refer to [SSL for SaaS (managed hostnames)](/ssl/ssl-for-saas/).
{{</Aside>}}

## Step 2 — Choose your encryption mode

Once you have chosen your edge certificate, [choose an encryption mode](/ssl/origin-configuration/ssl-modes/) to specify how Cloudflare should encrypt connections between a) visitors and Cloudflare and b) Cloudflare and your origin server.

{{<Aside type="warning" header="Warning:">}}
Before choosing an encryption mode, make sure you have changed relevant settings on your application or origin server. Otherwise, visitors may encounter errors on your site.
{{</Aside>}}

## Step 3 (optional) — Enable additional features

After you have chosen your edge certificate and updated your encryption mode, review the following Cloudflare settings:

- [Edge certificates](/ssl/edge-certificates/additional-options/): Customize different aspects of your edge certificates, from enabling **Opportunistic Encryption** to specifying a **Minimum TLS Version**.
- [Authenticated origin pull](/ssl/origin-configuration/authenticated-origin-pull/): Ensure all requests to your origin server originate from the Cloudflare network.
- [Notifications](/ssl/notifications/): Set up alerts related to certificate validation status, issuance, deployment, renewal, and expiration.
