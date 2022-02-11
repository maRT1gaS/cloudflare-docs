---
order:
title: Linux
pcx-content-type: how-to
---

import CaptivePortals from "../\_partials/\_captive-portals.md"

# Set up 1.1.1.1 - Linux

Follow these steps to configure 1.1.1.1 in Ubuntu and Debian:

## Ubuntu

1.  Click **System** > **Preferences** > **Network Connections**.

2.  Select the **Wireless tab**, then choose the WiFi network you are currently connected to.

3.  Click **Edit** > **IPv4**.

4.  Take note of any DNS addresses you might have and save them in a safe place in case you need to use them later.

5.  Change the DNS servers listed to:

    ```txt
    1.1.1.1
    1.0.0.1
    ```

6.  Click **Apply**.

7.  Then, go to **IPv6** and add the DNS servers:

    ```txt
    2606:4700:4700::1111
    2606:4700:4700::1001
    ```

8.  Click **Apply**.

9.  Visit [1.1.1.1/help](https://1.1.1.1/help) to make sure your system is connected to 1.1.1.1.

## Debian

1.  In the command line, type:

```sh
$ sudo vim /etc/resolv.conf
```

1.  Press the <kbd>i</kbd> key on your keyboard to edit the document.
2.  Take note of any DNS addresses you might have and save them in a safe place in case you need to use them later.
3.  Replace the `nameserver` lines with:

For IPv4:

    ```txt
    nameserver 1.0.0.1
    nameserver 1.1.1.1
    ```

For IPv6:

    ```txt
    nameserver 2606:4700:4700::1111
    nameserver 2606:4700:4700::1001
    ```

1.  Press the <kbd>ESC</kbd> key on your keyboard to save and exit Vim. Then, type:

<!---->

    :wq

1.  Visit [1.1.1.1/help](https://1.1.1.1/help) to make sure your system is connected to 1.1.1.1.

<CaptivePortals/>
