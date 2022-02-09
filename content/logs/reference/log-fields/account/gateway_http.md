---
title: Gateway HTTP
---

# Gateway HTTP

The descriptions below detail the fields available for `gateway_http`.

{{<table-wrap>}}

| Field               | Value                                                                  | Type           |
| ------------------- | ---------------------------------------------------------------------- | -------------- |
| AccountID           | Cloudflare account tag                                                 | string         |
| Action              | Action performed by gateway on the HTTP request                        | string         |
| BlockedFileHash     | Hash of the file blocked in the response, if any                       | string         |
| BlockedFileName     | File name blocked in the request, if any                               | string         |
| BlockedFileReason   | Reason file was blocked in the response, if any                        | string         |
| BlockedFileSize     | File size(bytes) blocked in the response, if any                       | string         |
| BlockedFileType     | File type blocked in the response eg. exe, bin, if any                 | string         |
| Datetime            | The date and time the corresponding HTTP request was made              | int or string  |
| DestinationIP       | Destination ip of the request                                          | string         |
| DestinationPort     | Destination port of the request                                        | string         |
| DeviceID            | UUID of the device where the HTTP request originated from              | string         |
| DownloadedFileNames | List of files downloaded in the HTTP request                           | array\[string] |
| Email               | Email used to authenticate the client                                  | string         |
| HTTPHost            | Content of the host header in the HTTP request                         | string         |
| HTTPMethod          | HTTP request method                                                    | string         |
| HTTPVersion         | Version name for the HTTP request                                      | string         |
| IsIsolated          | If the requested was isolated with Cloudflare Browser Isolation or not | bool           |
| PolicyID            | The gateway policy UUID applied to the request, if any                 | string         |
| Referer             | Contents of the referer header in the HTTP request                     | string         |
| RequestID           | Cloudflare request ID. This might be empty on bypass action            | string         |
| SourceIP            | Source ip of the request                                               | string         |
| SourcePort          | Source port of the request                                             | string         |
| URL                 | HTTP request URL                                                       | string         |
| UploadedFileNames   | List of files uploaded in the HTTP request                             | array\[string] |
| UserAgent           | Contents of the user agent header in the HTTP request                  | string         |
| UserID              | User identity where the HTTP request originated from                   | string         |

{{</table-wrap>}}