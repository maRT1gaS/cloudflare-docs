---
weight: null
title: Linux
pcx-content-type: how-to
meta:
  title: Set up 1.1.1.1 for Families - Linux
---

import CaptivePortals from '../_partials/_captive-portals.md';

# Set up 1.1.1.1 for Families - Linux

Follow these steps to configure 1.1.1.1 for Families in Ubuntu and Debian.

## Block malware

### Ubuntu

#### IPv4

1.  Click **System** > **Preferences** > **Network Connections**.

2.  Select the **Wireless** tab, then choose the WiFi network you are currently connected to.

3.  Click **Edit** > **IPv4**.

4.  Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.

5.  Remove any IP addresses that may be already listed and in their place add the following IP addresses:

    ```txt
    1.1.1.2
    1.0.0.2
    ```

6.  Click **Apply**.

#### IPv6

1.  Click **System** > **Preferences** > **Network Connections**.

2.  Select the **Wireless** tab, then choose the WiFi network you are currently connected to.

3.  Go to **IPv6**.

4.  Add the IPv6 addresses listed below:

    ```txt
    2606:4700:4700::1112
    2606:4700:4700::1002
    ```

5.  Click **Apply**.

### Debian

#### IPv4

1.  In the command line, type:

    ```bash
    sudo vim /etc/resolv.conf
    ```

2.  Press the <kbd>i</kbd> key on your keyboard to edit the document.

3.  Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.

4.  Replace the nameserver lines with:

    ```txt
    1.1.1.2
    1.0.0.2
    ```

5.  Press the <kbd>ESC</kbd> key on your keyboard to save and exit Vim. Then, type:

        :wq

#### IPv6

1.  In the command line, type:

    ```bash
    sudo vim /etc/resolv.conf
    ```

2.  Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.

3.  Add the IPv6 address listed below:

    ```txt
    2606:4700:4700::1112
    2606:4700:4700::1002
    ```

4.  Press the <kbd>ESC</kbd> key on your keyboard to save and exit Vim. Then, type:

        :wq

## Block Malware and Adult Content

### Ubuntu

#### IPv4

1.  Click **System** > **Preferences** > **Network Connections**.

2.  Select the **Wireless** tab, then choose the WiFi network you are currently connected to.

3.  Click **Edit** > **IPv4**.

4.  Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.

5.  Remove any IP addresses that may be already listed and in their place add the following IP addresses:

    ```txt
    1.1.1.3
    1.0.0.3
    ```

6.  Click **Apply**.

#### IPv6

1.  Click **System** > **Preferences** > **Network Connections**.

2.  Select the **Wireless** tab, then choose the WiFi network you are currently connected to.

3.  Go to **IPv6**.

4.  Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.

5.  Add the IPv6 addresses listed below:

    ```txt
    2606:4700:4700::1113
    2606:4700:4700::1003
    ```

6.  Click **Apply**.

### Debian

#### IPv4

1.  In the command line, type:

    ```bash
    sudo vim /etc/resolv.conf
    ```

2.  Press the <kbd>i</kbd> key on your keyboard to edit the document.

3.  Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.

4.  Replace the nameserver lines with:

    ```txt
    1.1.1.3
    1.0.0.3
    ```

5.  Press the <kbd>ESC</kbd> key on your keyboard to save and exit Vim. Then, type:

        :wq

#### IPv6

1.  In the command line, type:

    ```bash
    sudo vim /etc/resolv.conf
    ```

2.  Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.

3.  Add the IPv6 addresses listed below:

    ```txt
    2606:4700:4700::1113
    2606:4700:4700::1003
    ```

4.  Press the <kbd>ESC</kbd> key on your keyboard to save and exit Vim. Then, type:

        :wq

<CaptivePortals />
