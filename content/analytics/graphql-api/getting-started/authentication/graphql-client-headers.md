---
weight: 40
pcx-content-type: how-to
title: Configure GraphQL client endpoint and HTTP headers
---

# Configure GraphQL client endpoint and HTTP headers

1.  Launch _GraphiQL_.
2.  Click **Edit HTTP Headers**.
    ![Click Edit HTTP Headers](../../../static/images/GraphiQL-edit-http-headers.png)
    The _Edit HTTP Headers_ window appears.
    ![Edit HTTP Headers Window](../../../static/images/GraphiQL-edit-http-headers-window.png)
3.  Click **Add Header**.
    ![Click Add Header](../../../static/images/GraphiQL-add-header.png)
4.  Enter **X-AUTH-EMAIL** in the _Header name_ field and your email address registered with Cloudflare in the _Header value_ field, and click **Save**.
5.  To configure authentication, click **Add Header**. You can use Cloudflare Analytics API token authentication (recommended) or Cloudflare API key authentication.
    - **Token authentication**:
      Enter **Authorization** in the _Header Name_ field, and enter **Bearer {your-analytics-token}** in the _Header value_ field, then click **Save**.
      ![HTTP Headers](../../../static/images/GraphiQL-edit-http-headers-token.png)
    - **Key authentication**:
      Enter **X-AUTH-KEY** in the _Header Name_ field, and paste your Global API Key in the _Header value_ field, then click **Save**.
      ![HTTP Headers](../../../static/images/GraphiQL-edit-http-headers-complete.png)
6.  Click anywhere outside the _Edit HTTP Headers_ window in _GraphiQL_ to close it and return to the main _GraphiQL_ display.
7.  Enter `https://api.cloudflare.com/client/v4/graphql` in the _GraphQL Endpoint_ field
    ![Edit GraphQL Endpoint](../../../static/images/GraphiQL-response-pane.png)

{{<Aside type="note" header="Note">}}
The right-side response pane is empty when you enter your information correctly. An error displays when there are problems with your header credentials.
{{</Aside>}}

Now that you have configured authentication with a Cloudflare API key, you are ready to run queries using _GraphiQL_.
