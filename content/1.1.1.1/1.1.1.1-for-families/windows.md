---
weight: null
title: Windows 10
pcx-content-type: how-to
meta:
  title: Set up 1.1.1.1 for Families - Windows 10
---

import CaptivePortals from '../_partials/_captive-portals.md';

# Set up 1.1.1.1 for Families - Windows 10

Follow these steps to configure 1.1.1.1 for Families:

## Block malware

### IPv4

1.  Click the **Start menu** > **Settings**.

2.  Select **Network and Internet** > **Change Adapter Settings**.

3.  Right-click on the WiFi network you are connected to and click **Properties**.

4.  Select **Internet Protocol Version 4**

5.  Click **Properties**.

6.  Click **Use The Following DNS Server Addresses**.

7.  Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.

8.  Remove any IP addresses that may be already listed and in their place add:

    ```txt
    1.1.1.2
    1.0.0.2
    ```

9.  Click **OK**.

### IPv6

1.  Click the **Start menu** > **Settings**.

2.  Click **Network and Internet** > **Change Adapter Settings**.

3.  Right-click on the Wi-Fi network you are connected to and click **Properties**.

4.  Select **Internet Protocol Version 6**.

5.  Click **Properties** > **Use The Following DNS Server Addresses**.

6.  Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.

7.  Remove any IP addresses that may be already listed and in their place add the following IP addresses:

    ```txt
    2606:4700:4700::1112
    2606:4700:4700::1002
    ```

8.  Click **OK**.

## Block malware and adult content

### IPv4

1.  Click the **Start menu** > **Settings**.

2.  Select **Network and Internet** > **Change Adapter Settings**.

3.  Right-click on the WiFi network you are connected to and click **Properties**.

4.  Select **Internet Protocol Version 4**

5.  Click **Properties**.

6.  Click **Use The Following DNS Server Addresses**.

7.  Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.

8.  Remove any IP addresses that may be already listed and in their place add:

    ```txt
    1.1.1.3
    1.0.0.3
    ```

9.  Click **OK**.

### IPv6

1.  Click the **Start menu** > **Settings**.

2.  Click **Network and Internet** > **Change Adapter Settings**.

3.  Right-click on the Wi-Fi network you are connected to and click **Properties**.

4.  Select **Internet Protocol Version 6**.

5.  Click **Properties** > **Use The Following DNS Server Addresses**.

6.  Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.

7.  Remove any IP addresses that may be already listed and in their place add the following IP addresses:

    ```txt
    2606:4700:4700::1113
    2606:4700:4700::1003
    ```

8.  Click **OK**.

<CaptivePortals />
