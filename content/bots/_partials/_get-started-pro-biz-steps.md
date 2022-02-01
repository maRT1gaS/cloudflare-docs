---
_build:
  publishResources: false
  render: never
  list: never
---
To start using Super Bot Fight Mode:

1. Go to **Firewall** > **Bots**.
1. Select **Configure Super Bot Fight Mode**.
1. Choose how your domain should respond to various types of traffic:
   - See [Static resource protection](/about/static-resources/) for more additional details on supported file types
   - See [JavaScript detections](/about/javascript-detections) for more information on invisible code injection

{{<Aside type="warning" header="Warning">}}
If your organization also uses [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps), keep **Definitely Automated** set to **Allow**. Otherwise, tunnels might fail with a `websocket: bad handshake` error.
{{</Aside>}}
