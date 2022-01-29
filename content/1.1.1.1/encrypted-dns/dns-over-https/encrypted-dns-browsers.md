---
weight: null
pcx-content-type: how-to
title: Configure DoH on your browser
---

# Configure DoH on your browser

There are several browsers compatible with DNS over HTTPS (DoH). This protocol lets you encrypt your connection to 1.1.1.1 in order to protect your DNS queries from privacy intrusions and tampering.

## Mozilla Firefox

1.  Click the menu button.
2.  Select **Settings**.
3.  In the **General** menu, scroll down to access **Network Settings**.
4.  Click on the **Settings** button.
5.  Click **Enable DNS over HTTPS**. By default, it resolves to Cloudflare DNS.

## Google Chrome

{{<Aside type="note">}}
This setting may already be enabled by default.
{{</Aside>}}

1.  Click on the three-dot menu in your browser window.
2.  Select **Settings**.
3.  Scroll down to **Privacy and security** > **Security**.
4.  Scroll down and enable the **Use secure DNS** switch.

Your browser infers the DNS over HTTPS provider you want based on your system DNS. To benefit from Cloudflare DoH, make sure your system is [properly configured](/1.1.1.1/setup-1.1.1.1/windows/).

## Microsoft Edge

{{<Aside type="note">}}
This setting may already be enabled default.
{{</Aside>}}

1.  Go to `edge://settings/privacy`.
2.  Scroll down to the **Security** section.
3.  Make sure the **Use secure DNS** option is enabled.
4.  Select **Choose a service provider** > **Cloudflare (1.1.1.1)**.

## Brave

1.  Click the menu button in your browser window.
2.  Navigate to **Settings**.
3.  On the left side of the menu, scroll down and click **Additional settings**.
4.  Navigate to **Privacy and security** > **Security**.
5.  Enable **Use secure DNS**.
6.  Click **With Custom** and choose _Cloudflare (1.1.1.1)_ as a service provider from the drop-down menu.

## How to check if my browser is configured correctly?

1.  Visit [1.1.1.1 help page](https://1.1.1.1/help).
2.  Verify that `Using DNS over HTTPS (DoH)` is `Yes`.
