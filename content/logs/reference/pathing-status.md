---
weight: 122
pcx-content-type: reference
title: Pathing status
---

# Pathing status

## Understanding pathing

Cloudflare issues the following **Edge Pathing Statuses**:

- **EdgePathingSrc** (pathing source): The stage that made the routing decision
- **EdgePathingOp** (pathing operation): The specific action or operation taken
- **EdgePathingStatus** (pathing status): Additional information complementing the **EdgePathingOp**

### EdgePathingSrc

**EdgePathingSrc** refers to the system that last handled the request before an error occurred or the request was passed to the cache server. Typically, this will be the macro/reputation list. Possible pathing sources include:

- _err_
- _sslv_ (SSL verification checker)
- _bic_ (browser integrity check)
- _hot_ (hotlink protection)
- _macro_ (the reputation list)
- _skip_ (Always Online or CDNJS resources)
- _user_ (user firewall rule)

For example:

```bash
$ jq -r .EdgePathingSrc logs.json | sort -n | uniq -c | sort -n | tail
1 err
5 user
93 macro
```

### EdgePathingOp

**EdgePathingOp** indicates how the request was handled. _wl_ is a request that passed all checks and went to your origin server. Other possible values are:

- _errHost_ (host header mismatch, DNS errors, etc.)
- _ban_ (blocked by IP address, range, etc.)
- _tempOk_ (challenge successfully completed)
- _chl_ (challenge issued)

For example:

```bash
$ jq -r .EdgePathingOp logs.json | sort -n | uniq -c | sort -n | tail
1 chl
1 errHost
97 wl
```

### EdgePathingStatus

**EdgePathingStatus** is the value _EdgePathingSrc_ returns. With a pathing source of _macro_, _user_, or _err_, the pathing status indicates the list where the IP address was found. _nr_ is the most common value and it means that the request was not flagged by a security check. Some values indicate the class of user; for example, _se_ means search engine. Others indicate whether the visitor saw an error or a captcha, such as, _captchaNew_ or _jschlOK_.

For example:

```bash
$ jq -r .EdgePathingStatus logs.json | sort -n | uniq -c | sort -n | tail
1 captchaNew
1 dnsErr
5 ip
92 nr
```

## How does pathing map to Threat Analytics?

Certain combinations of pathing have been labeled in the Cloudflare **Threat Analytics** feature (in the **Analytics** app in the Cloudflare dashboard). The mapping is as follows:

{{<table-wrap>}}

| Pathing               | Label                |
| --------------------- | -------------------- |
| bic.ban.unknown       | Bad browser          |
| hot.ban.unknown       | Blocked hotlink      |
| hot.ban.ip            |                      |
| macro.ban.ip          | Bad IP               |
| user.ban.ctry         | Country block        |
| user.ban.ip           | IP block (user)      |
| user.ban.ipr16        | IP range block (/16) |
| user.ban.ipr24        | IP range block (/24) |
| macro.chl.captchaErr  | Captcha Error        |
| macro.chl.captchaFail | Human Challenged     |
| macro.chl.captchaNew  | New CAPTCHA (CF)     |
| macro.chl.jschlFail   | Browser Challenged   |
| macro.chl.jschlNew    | Challenged threat    |
| macro.chl.jschlErr    | Bot request          |
| user.chl.captchaNew   | New CAPTCHA (user)   |

{{</table-wrap>}}

## Understanding response fields

The response status appears in three places in a request:

- _edgeResponse_
- _cacheResponse_
- _originResponse_

In your logs, the edge is what first accepts a visitor's request. The cache then accepts the request and either forwards it to your origin or responds from the cache. It's possible to have a request that has only an _edgeResponse_ or a request that has an _edgeResponse_ and a _cacheResponse_, but no _originResponse_.

This is how you can see where a request terminates. Requests with only an _edgeResponse_ likely hit a security check or processing error. Requests with an _edgeResponse_ and a _cacheResponse_ either were served from the cache or saw an error contacting your origin server. Requests that have an _originResponse_ went all the way to your origin server and errors seen would have been served directly from there.

For example, the following query shows the status code and pathing information for all requests that terminated at the Cloudflare edge:

```bash
$ jq -r 'select(.OriginResponseStatus == null) | select(.CacheResponseStatus == null) |"\(.EdgeResponseStatus) / \(.EdgePathingSrc) / \(.EdgePathingStatus) / \(.EdgePathingOp)"' logs.json | sort -n | uniq -c | sort -n
1 403 / macro / captchaNew / chl
1 403 / macro / nr / wl
1 409 / err / dnsErr / errHost
```

The information stored is broken down based on the following categories (click for details below):

## Errors

These occur for requests that didn't pass any of the validation performed by the Cloudflare network. Example cases include:

- Whenever Cloudflare is unable to look up a domain or zone
- An attempt to improperly use the IP for an origin server
- Domain ownership is unclear (for example, the domain is not in Cloudflare)

{{<table-wrap>}}

| EdgePathingStatus         | Description                                              | EdgePathingOp     | EdgePathingSrc | Status Code  |
| ------------------------- | -------------------------------------------------------- | ----------------- | -------------- | ------------ |
| <em>cyclic</em>           | Cloudflare loop                                          | <em>err_host</em> |                | <em>403</em> |
| <em>dns_err</em>          | Unable to resolve                                        | <em>err_host</em> |                | <em>409</em> |
| <em>reserved_ip</em>      | DNS points to local or disallowed IP                     | <em>err_host</em> |                | <em>403</em> |
| <em>reserved_ip6</em>     | DNS points to local or disallowed IPv6 address           | <em>err_host</em> |                | <em>403</em> |
| <em>bad_host</em>         | Bad or no Host header                                    | <em>err_host</em> |                | <em>403</em> |
| <em>no_existing_host</em> | Ownership lookup failed: host possibly not on Cloudflare | <em>err_host</em> |                | <em>409</em> |

{{</table-wrap>}}

## User-based actions

These occur for actions triggered from users based on the configuration for a specific IP (or IP range).

{{<table-wrap>}}

| EdgePathingStatus                                                                                                                                                                | Description                                                            | EdgePathingOp | EdgePathingSrc | Status Code |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------- | -------------- | ----------- |
| <em>Asnum</em><br/> <em>ip</em><br/> <em>ipr24</em><br/> <em>ipr16</em><br/> <em>ip6</em><br/> <em>ip6r64</em><br/> <em>ip6r48</em><br/> <em>ip6r32</em><br/> <em>ctry</em><br/> | the request was blocked                                                | <em>ban</em>  | user           | 403         |
| <em>Asnum</em><br/> <em>ip</em><br/> <em>ipr24</em><br/> <em>ipr16</em><br/> <em>ip6</em><br/> <em>ip6r64</em><br/> <em>ip6r48</em><br/> <em>ip6r32</em><br/> <em>ctry</em><br/> | <ul><li>the request was allowed</li><li>WAF will not execute</li></ul> | <em>wl</em>   | user           |             |

{{</table-wrap>}}

To understand the behavior of challenge pages, see [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## Firewall Rules

The Cloudflare **Firewall Rules** app triggers actions based on matching customer-defined rules.

{{<table-wrap>}}

| EdgePathingStatus              | Description             | EdgePathingOp | EdgePathingSrc | Status Code |
| ------------------------------ | ----------------------- | ------------- | -------------- | ----------- |
| <em>filter_based_firewall</em> | the request was blocked | <em>ban</em>  |                |             |
| <em>filter_based_firewall</em> | the request was allowed | <em>wl</em>   |                |             |

{{</table-wrap>}}

To understand the behavior of challenge pages, see [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## Zone Lockdown

_Zone Lockdown_ blocks visitors to particular URIs where the visitor's IP is not allowlisted.

{{<table-wrap>}}

| EdgePathingStatus | Description       | EdgePathingOp | EdgePathingSrc | Status Code |
| ----------------- | ----------------- | ------------- | -------------- | ----------- |
| <em>zl</em>       | Lock down applied | <em>ban</em>  | <em>user</em>  |             |

{{</table-wrap>}}

To understand the behavior of challenge pages, see [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## Firewall User-Agent Block

Challenge (Captcha or JavaScript) or block visitors who use a browser for which the User-Agent name matches a specific string

{{<table-wrap>}}

| EdgePathingStatus | Description        | EdgePathingOp | EdgePathingSrc | Status Code |
| ----------------- | ------------------ | ------------- | -------------- | ----------- |
| <em>ua</em>       | Blocked User-Agent | <em>ban</em>  | <em>user</em>  |             |

{{</table-wrap>}}

To understand the behavior of challenge pages, see [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## Browser Integrity Check

Assert whether the source of the request is illegitimate or the request itself is malicious

{{<table-wrap>}}

| EdgePathingStatus                            | Description     | EdgePathingOp | EdgePathingSrc | Status Code |
| -------------------------------------------- | --------------- | ------------- | -------------- | ----------- |
| <span style="font-weight: 400;">empty</span> | Blocked request | <em>ban</em>  | <em>bic</em>   |             |

{{</table-wrap>}}

To understand the behavior of challenge pages, see [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## Hot Linking

Prevent hot linking from other sites

{{<table-wrap>}}

| EdgePathingStatus                            | Description     | EdgePathingOp | EdgePathingSrc | Status Code |
| -------------------------------------------- | --------------- | ------------- | -------------- | ----------- |
| <span style="font-weight: 400;">empty</span> | Blocked request | <em>ban</em>  | <em>hot</em>   |             |

{{</table-wrap>}}

To understand the behavior of challenge pages, see [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## L7-to-L7 DDoS mitigation

Drop DDoS attacks through L7 mitigation

{{<table-wrap>}}

| EdgePathingStatus                                      | Description     | EdgePathingOp | EdgePathingSrc   | Status Code |
| ------------------------------------------------------ | --------------- | ------------- | ---------------- | ----------- |
| <em><span style="font-weight: 400;">l7ddos</span></em> | Blocked request | <em>ban</em>  | <em>protect</em> |             |

{{</table-wrap>}}

To understand the behavior of challenge pages, see [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## IP Reputation (MACRO)

The macro stage is comprised of many different paths. They are categorized by the reputation of the visitor IP.

{{<table-wrap>}}

| EdgePathingStatus | Description                                                                                                                                                                                                                            | EdgePathingOp | EdgePathingSrc | Status Code |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------------- | ----------- |
| <em>nr</em>       | There is no reputation data for the IP and no action is being taken (if IUAM is on, a JS challenge is served)                                                                                                                          | wl            | macro          |             |
| <em>wl</em>       | IP is explicitly allowlisted                                                                                                                                                                                                           | wl            | macro          |             |
| <em>scan</em>     | IP is explicitly allowlisted and categorized as a security scanner                                                                                                                                                                     | wl            | macro          |             |
| <em>mon</em>      | IP is explicitly allowlisted and categorized as a Monitoring Service                                                                                                                                                                   | wl            | macro          |             |
| <em>bak</em>      | IP is explicitly allowlisted and categorized as a Backup Service                                                                                                                                                                       | wl            | macro          |             |
| <em>mob</em>      | IP is explicitly allowlisted and categorized as Mobile Proxy Service                                                                                                                                                                   | wl            | macro          |             |
| <em>se</em>       | IP is explicitly allowlisted as it belongs to a search engine crawler and no action is taken                                                                                                                                           | wl            | macro          |             |
| <em>grey</em>     | IP is greylisted (suspected to be bad) but the request was either for a favicon or security is turned off and as such, it is allowlisted.                                                                                              | wl            | macro          |             |
| <em>bad_ok</em>   | The reputation score of the IP is bad (or is a TOR IP) but the request was either for a favicon or security is turned off and as such, it is allowlisted. Alternatively, the threat score of the IP is in the accepted security level. | wl            | macro          |             |
| <em>unknown</em>  | The <em>pathing_status</em> is unknown and the request is being processed as normal.                                                                                                                                                   | wl            | macro          |             |

{{</table-wrap>}}

All other paths in the MACRO stage issue a challenge. Possible scenarios include:

- A clean IP (acceptable threat level) with IUAM on will trigger the JS challenge
- A greylisted IP triggers the JS challenge (captcha challenge if IUAM is on)
- An IP with a bad reputation (also TOR) with a threat level above the accepted threshold triggers a captcha challenge (JS challenge if IUAM is on)

## Rate Limiting

{{<table-wrap>}}

| EdgePathingStatus   | Description                  | EdgePathingOp     | EdgePathingSrc | Status Code |
| ------------------- | ---------------------------- | ----------------- | -------------- | ----------- |
| <em>rate_limit</em> | Dropped request              | <em>ban</em>      | <em>user</em>  |             |
| <em>rate_limit</em> | IP is explicitly allowlisted | <em>simulate</em> | <em>user</em>  |             |

{{</table-wrap>}}

To understand the behavior of challenge pages, see [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## Special cases

{{<table-wrap>}}

| EdgePathingStatus | Description                                              | EdgePathingOp | EdgePathingSrc  | Status Code |
| ----------------- | -------------------------------------------------------- | ------------- | --------------- | ----------- |
| ao_crawl          | AO (Always Online) crawler request                       | <em>wl</em>   | <em>skip</em>   |             |
| <em>cdnjs</em>    | Request to a cdnjs resource                              | <em>wl</em>   | <em>skip</em>   |             |
|                   | certain challenge forced by Cloudflare's special headers |               | <em>forced</em> |             |

{{</table-wrap>}}

## JavaScript and Captcha Challenge

{{<table-wrap>}}

| EdgePathingStatus                                                 | Description                                                                                                                                                                                                                                               | EdgePathingOp       | EdgePathingSrc | Status Code                                                                 |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------------- | --------------------------------------------------------------------------- |
| <ul><li><em>captchaNew</em></li><li><em>jschlNew</em></li></ul>   | A Captcha/JavaScript challenge was presented                                                                                                                                                                                                              | <em>chl</em>        |                | <ul><li><em>403</em></li><li><em>503</em></li></ul>                         |
| <ul><li><em>captchaOk</em></li><li><em>jschlOk</em></li></ul>     | A Captcha/JavaScript challenge would have been presented but a clearance cookie was present                                                                                                                                                               | <em>temp_ok</em>    |                | <ul><li>As per request</li></ul>                                            |
| <ul><li><em>captchaSucc</em></li><li><em>jschlSucc</em></li></ul> | A Captcha challenge was solved correctly and a clearance cookie will be issued                                                                                                                                                                            | <em>temp_ok</em>    | <em>macro</em> | <ul><li><em>302</em> (Redirect to original URL)</li></ul>                   |
| <ul><li><em>captchaFail</em></li><li><em>jschlFail</em></li></ul> | A failed attempt at solving the Captcha challenge, no clearance cookie will be issued                                                                                                                                                                     | <p><em>chl</em></p> | <em>macro</em> | <ul><li><em>302</em> (Redirect to original URL)</li></ul>                   |
| <ul><li><em>captchaErr</em></li><li><em>jschlErr</em></li></ul>   | A failed attempt at solving the Captcha challenge, no clearance cookie will be issued. Not enough data was provided to solve the challenge. The difference to the previous case is that not all input was provided which is needed to verify the solution | <p><em>chl</em></p> | <em>macro</em> | <br /><ul><li><em>302</em> (Redirect to original URL)</li></ul><br /><br /> |
| <ul><li><em>tokRedempSucc</em></li></ul>                          | A blinded-token redemption was successful                                                                                                                                                                                                                 | <p><em>chl</em></p> |                | <ul><li>As per request</li></ul>                                            |
| <ul><li><em>tokRedempFail</em></li></ul>                          | A blinded-token redemption failed                                                                                                                                                                                                                         | <em>chl</em>        |                | <ul><li>As per request</li></ul>                                            |

{{</table-wrap>}}
