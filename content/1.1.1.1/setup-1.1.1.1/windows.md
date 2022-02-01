---
weight: null
title: Windows 10
pcx-content-type: how-to
meta:
  title: Set up 1.1.1.1 - Windows 10
---

# Set up 1.1.1.1 - Windows 10

Follow these steps to configure 1.1.1.1:

1.  Click the **Start menu** > **Settings**.

2.  Select **Network and Internet** > **Change Adapter Settings**.

3.  Right-click on the WiFi network you are connected to and click **Properties**.

4.  Select **Internet Protocol Version 4**.

5.  Click **Properties** > **Use The Following DNS Server Addresses**.

6.  Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.

7.  Remove any IP addresses that may be already listed and in their place add:

    ```txt
    1.1.1.1
    1.0.0.1
    ```

8.  Click **OK**.

9.  Now, go to **Internet Protocol Version 6**.

10. Select **Properties** > **Use The Following DNS Server Addresses**.

11. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.

12. Remove any IP addresses that may be already listed and in their place add:

    ```txt
    2606:4700:4700::1111
    2606:4700:4700::1001
    ```

13. Click **Close**.

{{<render file="_captive-portals.md">}}
{{<render file="_encrypted.md">}}
