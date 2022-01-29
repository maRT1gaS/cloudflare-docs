---
weight: 1
pcx-content-type: how-to
title: Manage universal certificates
---

# Manage universal certificates

## Enable Universal SSL

### Authoritative (Full) domains

For an authoritative or full domain — domains that changed their [domain nameservers](https://support.cloudflare.com/hc/articles/205195708) – Universal SSL requires two steps:

1.  Once you change your domain nameservers, your domain should receive its Universal SSL certificate within **24 hours**.
2.  Based on your imported DNS records, Cloudflare sets your default **SSL/TLS encryption mode**. For help changing your encryption mode, refer to [SSL modes](/ssl/origin-configuration/ssl-modes/).

### Non-authoritative (Partial) domains

For non-authoritative or partial domains (domains on a CNAME setup), Universal SSL will be:

- Provisioned once the DNS record is [proxied through Cloudflare](https://support.cloudflare.com/hc/articles/360020348832#h_836723523521544131668686) (orange-clouded).
- Validated:

  - Immediately if you add [Domain Control Validation (DCV)](/ssl/changing-dcv-method/) records to your authoritative DNS.
  - After a brief period of downtime if you **do not** add DCV records (once your traffic is proxied).

## Disable Universal SSL

Some customers may need to manage their own SSL certificates or rely on specific Certificate Authorities.

If you disable your domain's Universal SSL certificate, Cloudflare removes that certificate from our network and will not order or renew any additional Universal SSL certificates.

### Potential errors

To avoid errors with your domain, either [upload a custom certificate](/ssl/custom-certificates/) or purchase [Advanced Certificate Manager](/ssl/advanced-certificate-manager/) before disabling Universal SSL.

If you disable Universal SSL, you may experience errors with the following scenarios:

- **Enabled features**:

  - [HTTP Strict Transport Security (HSTS)](/ssl/http-strict-transport-security/)
  - [Always Use HTTPS](/ssl/edge-certificates/additional-options/always-use-https/)
  - [Opportunistic Encryption](/ssl/edge-certificates/additional-options/opportunistic-encryption/)

- **Other setups**:

  - [Page rules](https://support.cloudflare.com/hc/articles/218411427) that redirect traffic to HTTPS
  - HTTP to HTTPS redirects at your origin web server

### Disable Universal SSL

To disable Universal SSL:

1.  Make sure you have [uploaded a custom certificate](/ssl/custom-certificates/) or purchased [Advanced Certificate Manager](/ssl/advanced-certificate-manager/) to protect your domain.
2.  Log in to the Cloudflare dashboard and select your account.
3.  Select your domain.
4.  Go to **SSL/TLS** > **Edge Certificates**.
5.  For **Disable Universal SSL**, select **Disable Universal SSL**.
6.  Read the warnings in the **Acknowledgement**.
7.  Select **I Understand** and click **Confirm**.
