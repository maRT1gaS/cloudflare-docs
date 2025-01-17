---
weight: 3
pcx-content-type: how-to
title: Manage DNS records
---

# Manage DNS records

DNS records help communicate information about your domain to visitors and other web services.

{{<Aside type="note" header="Note:">}}
For more background about different types of DNS records, refer to the [Learning Center](https://www.cloudflare.com/learning/dns/dns-records/).
{{</Aside>}}

***

## Create DNS records

When you add a new domain to Cloudflare, Cloudflare automatically scans for common records and adds them to your account's **DNS** page. If you want to bulk import your own records, refer to [import DNS records](/dns/import-and-export/).

{{<Aside type="note">}}
If your domain is added to Cloudflare by a hosting partners, manage your DNS records via the hosting partner.
{{</Aside>}}

### Using the dashboard

To create a DNS record in the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select an account and domain.

2.  Navigate to **DNS**.

3.  Click **Add record**.

4.  Choose a record **Type**.

    *   To learn more about different record types, refer to the [Learning Center](https://www.cloudflare.com/learning/dns/dns-records/).
    *   For record information specific to Cloudflare, refer to [DNS records](/dns/reference/dns-record-types/).
    *   For help deciding which records to proxy, refer to [Proxied DNS records](/dns/reference/proxied-dns-records/).

5.  Complete the required fields.

6.  Click **Save**.

### Using the API

To create records with the API, use a [POST request](https://api.cloudflare.com/#dns-records-for-a-zone-create-dns-record).

***

## Edit DNS records

### Using the dashboard

To edit DNS records in the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select an account and domain.
2.  Navigate to **DNS**.
3.  On a specific record, click **Edit**.
4.  Make any necessary changes.
5.  Click **Save**.

### Using the API

To update part of a record with the API, use a [PATCH request](https://api.cloudflare.com/#dns-records-for-a-zone-patch-dns-record). If you want to overwrite the entire existing record, use a [PUT request](https://api.cloudflare.com/#dns-records-for-a-zone-update-dns-record).

***

## Delete DNS records

### Using the dashboard

To delete DNS records in the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select an account and domain.
2.  Navigate to **DNS**.
3.  On a specific record, click **Edit**.
4.  Click **Delete**.
5.  Click **Delete** again to confirm.

### Using the API

To delete records with the API, use a [DELETE request](https://api.cloudflare.com/#dns-records-for-a-zone-delete-dns-record).
