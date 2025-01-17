---
weight: 4
pcx-content-type: how-to
title: OS Version
meta:
  title: OS Version (beta)
---

# OS Version (beta)

<details>
<summary>Feature availability</summary>
<div>

| Status | Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Teams plans](https://www.cloudflare.com/teams-pricing/) |
| ------ | ----------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Beta   | macOS, Windows    | WARP with Gateway                                                                         | All plans                                                |

</div>
</details>

The OS Version device posture attribute checks whether the version of a device’s operating system matches, is greater than or lesser than a given value.

To enable the OS version check:

1.  On the Teams Dashboard, navigate to **My Team** > **Devices** > **Device posture**.
2.  Click **+Add**.
3.  Select **OS version**.
4.  Enter a descriptive name for the check.
5.  Combine the **Operating system**, **Operator**, and **Value** fields to specify the OS version you want devices to match.
6.  Click **Save**.

## Determine the OS Version

Operating systems display version numbers in different ways. This section covers how to retrieve the version number in each OS, in a format matching what the OS Version posture check expects.

### On macOS

1.  Open a terminal window
2.  Use the `defaults` command to check for the value of `SystemVersionStampAsString`

```txt
defaults read loginwindow SystemVersionStampAsString
```

### On Windows

1.  Open a powershell windows
2.  Use the `Get-CimInstance` command to get the version property of the `Win32_OperatingSystem` class

```txt
(Get-CimInstance Win32_OperatingSystem).version
```
