---
order: 4
pcx-content-type: how-to
title: Send events
---

# Send events to a third-party tool

Events are bundles of information Zaraz sends to a third-party tool when a particular trigger is matched. For example, you might want to track purchases in your website, and create a trigger that sends information about this to your Google Analytics account. Refer to [Zaraz Track](/web-api/zaraz-track) for more information.

To start using events, first create a trigger to determine when this bundle of information is sent to a third-party tool. If you have already [set up a trigger](/get-started/create-trigger), follow these steps to create an event.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website. 

1. Go to **Zaraz**.

1. Under **Third-party tools**, click **Edit** on the third-party tool you want to send an Event to — for example, Facebook Pixel or Google Analytics.

1. Click the **Create event**. 

1. Give the event a descriptive name.

1. In the **Firing triggers** field, choose the relevant trigger you [previously created](/get-started/create-trigger). You may choose more than one trigger for your event. If you choose more than one trigger, the event will be sent to the third-party tool only when all the selected triggers are matched.

1. Depending on the tool, you may also choose an **Event type** — either **Page View** or **Event**. The options you can fill out in **Event** will depend on the tool you are configuring.

1. Click **Save**.

The new event you created will appear in the third-party tool, in the **Events** tab, under **Tracking Events**. 