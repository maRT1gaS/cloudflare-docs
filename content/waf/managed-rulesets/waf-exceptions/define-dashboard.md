---
pcx-content-type: how-to
weight: 1
title: Define WAF exceptions in the dashboard
---

# Define WAF exceptions in the dashboard

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account and website.

2.  Go to **Firewall** > **WAF**.

3.  Click **Add WAF exception**.

4.  Enter a name for the exception.

    ![Create WAF exception page](../../images/waf-exception-create.png)

5.  In **When incoming requests match**, specify a filter expression that defines the conditions for applying the WAF exception. The filter expression uses the same language as the [Firewall Rules language](/firewall/cf-firewall-language).

6.  In **Then**, select the [WAF exception type](/waf/managed-rulesets/waf-exceptions/#types-of-waf-exceptions) that determines which rules to skip:

    - _Skip all remaining rules_ — Skips all remaining rules of WAF Managed Rulesets.
    - _Skip specific rules from a Managed Ruleset_ — Click **Select rules** to select the specific rules to skip. Learn more about [searching and selecting Managed Ruleset rules](/waf/managed-rulesets/deploy-zone-dashboard/#configure-rules-in-bulk-in-a-managed-ruleset).

7.  To save and deploy your WAF exception, click **Deploy**. If you are not ready to deploy your exception, click **Save as Draft**.
