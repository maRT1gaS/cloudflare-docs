---
title: Enable Microsoft Azure
weight: 62
pcx-content-type: how-to
---

import EnableReadPermissions from '../../../_partials/_enable-read-permissions.md';

# Enable Logpush to Microsoft Azure

Cloudflare Logpush supports pushing logs directly to Microsoft Azure via the Cloudflare dashboard or via API.

## Manage via the Cloudflare dashboard

Enable Logpush to Microsoft Azure via the dashboard.

To enable the Cloudflare Logpush service:

1. Log in to the Cloudflare dashboard.

1. Select the Enterprise domain you want to use with Logpush.

1. Go to **Analytics** > **Logs**.

1. Click **Connect a service**. A modal window opens where you will need to complete several steps.

1. Select the data set you want to push to a storage service.

1. Select the data fields to include in your logs. You can add or remove fields later by modifying your settings in **Logs** > **Logpush**.

1. Select **Microsoft Azure**.

1. Enter or select the following destination information:

   - **SAS URL**
   - **Blob container subpath (optional)**
   - **Daily subfolders**

1. Click **Validate access**.
1. Enter the **Ownership token** (included in a file or log Cloudflare sends to your provider) and click **Prove ownership**. To find the ownership token, click the **Open** button in the **Overview** tab of the ownership challenge file.

1. Click **Save and Start Pushing** to finish enabling Logpush.

Once connected, Cloudflare lists Microsoft Azure as a connected service under **Logs** > **Logpush**. Edit or remove connected services from here.

## Manage via API

Cloudflare uses a service-level shared access signature (SAS) to gain access to your Blob Storage container. You'll need to provide _Write_ permission and an expiration period of at least 5 years, which will allow you to not worry about the SAS token expiring.

<EnableReadPermissions />

To enable Logpush to Azure:

1. Create a Blob Storage container. _See [instructions from Azure](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal)_.

1. Create a shared access signature (SAS). To learn about shared access signatures, _see [information from Azure](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview)_. Logpush requires a _service-level SAS_, which provides the most restricted access. To create a service-level SAS, _see [instructions from Azure](https://docs.microsoft.com/en-us/rest/api/storageservices/create-service-sas)_ or use the _Storage Explorer_ feature in your storage account portal. Select _Storage Explorer_, navigate to and then right-click on your blob container to see the _Get Shared Access Signature_ option. Select that option, set an expiry time of at least 5 years, and select only _Write_ permission.

1. Provide the SAS URL when prompted by the Logpush API or UI.

{{<Aside type="note" header="Note">}}
Logpush will stop pushing logs if your SAS token expires, which is why an expiration period of at least 5 years is required. You can always update your Logpush job with a new token if needed.
{{</Aside>}}
