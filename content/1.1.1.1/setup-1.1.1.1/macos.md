---
weight: null
title: macOS
pcx-content-type: how-to
meta:
  title: Set up 1.1.1.1 - macOS
---

# Set up 1.1.1.1 - macOS

Follow these steps to configure 1.1.1.1:

## IPv4

1.  Go to **System Preferences**. You can find it by pressing <kbd>Command</kbd> + <kbd>Space</kbd> on your keyboard and typing `System Preferences`.

2.  Click on the **Network** icon > **Advanced**.

3.  Select the **DNS** tab. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.

4.  Remove any IP addresses that may be already listed and in their place add:

    ```txt
    1.1.1.1
    1.0.0.1
    ```

5.  Click **OK** > **Apply**.

## IPv6

1.  Go to **System Preferences**. You can find it by pressing <kbd>Command</kbd> + <kbd>Space</kbd> on your keyboard and typing `System Preferences`.

2.  Click on the **Network** icon > **Advanced**.

3.  Select the **DNS** tab. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.

4.  Remove any IP addresses that may be already listed and in their place add:

    ```txt
    2606:4700:4700::1111
    2606:4700:4700::1001
    ```

5.  Click **OK** > **Apply**.

{{<render file="_captive-portals.md">}}
{{<render file="_encrypted.md">}}