---
weight: 3
pcx-content-type: how-to
title: Cloudflare dashboard SSO application
---

# Cloudflare dashboard SSO application

By adding a **Dashboard SSO application** to your Cloudflare Teams account, you can enforce single sign-on (SSO) to the Cloudflare dashboard with the identity provider (IdP) of your choice.

{{<Aside type="note">}}
Dashboard SSO is only available to Enterprise customers.
{{</Aside>}}

## Set up dashboard SSO

### Step 1 — Launch Cloudflare for Teams

To log into Cloudflare for Teams directly, go to the [Teams dashboard](https://dash.teams.cloudflare.com/) and select your account.

To log in through the Cloudflare dashboard:

1.  Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2.  Log into the [Teams dashboard](/cloudflare-one/setup/#start-from-the-cloudflare-dashboard).

### Step 2 — Set up an IdP

Configure an IdP following [our detailed instructions](/cloudflare-one/identity/idp-integration/).

Once you configure your IdP, make sure you also [test your IdP](/cloudflare-one/identity/idp-integration/#test-idps-on-the-teams-dashboard).

### Step 3 — Contact your account team

Ask your account team to approve your SSO domain.

### Step 4 — Test and enable your application

To test and enable your SSO application:

1.  Log into the [Teams dashboard](https://dash.teams.cloudflare.com/).
2.  Navigate to **Settings** > **Authentication**.
3.  In the **Cloudflare dashboard SSO** section, find your email domain.
4.  Set the toggle value to **Enabled**.
    1.  This action can only be performed by Account Super Admininstrators.
5.  **Do not** log out or close your browser window. Instead, open a different browser or an incognito window.
6.  Navigate to the [Cloudflare dashboard](https://dash.cloudflare.com) and log in with your email address from your SSO domain.
7.  If you can log in successfully, you have successfully set up your SSO application.
8.  If you cannot log in successfully:

    1.  Return to the the [Teams dashboard](https://dash.teams.cloudflare.com/).
    2.  For **Cloudflare dashboard SSO**, set your email domain to **Disabled**.
    3.  [Re-configure your IdP](/cloudflare-one/identity/idp-integration/).
