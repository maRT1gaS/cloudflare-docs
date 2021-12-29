---
order: 9
pcx-content-type: concept
---

# Cron Triggers

## Background

Cron Triggers allow users to map a cron expression to a Worker script using a [ScheduledEvent](/runtime-apis/scheduled-event) listener that enables Workers to be executed on a schedule. Cron Triggers are ideal for running periodic jobs for maintenance or calling third-party APIs to collect up-to-date data. Workers scheduled by Cron Triggers will run on underutilized machines to make the best use of Cloudflare's capacity and route traffic efficiently.

## Adding Cron Triggers

You can add Cron Triggers to scripts with the Cloudflare API, or in the dashboard in **Workers** > **Manage Workers** > select **your Worker** > [**Triggers**](https://dash.cloudflare.com/?to=/:account/workers). Refer to [Limits](/limits#number-of-schedules) to track the maximum number of Cron Triggers per Worker. If a script is managed with Wrangler, Cron Triggers should be exclusively managed through the `wrangler.toml` file.

<Aside type="note" header="Requires a ScheduledEvent Listener">

To respond to a Cron Trigger, you must add a [`"scheduled"` event](/runtime-apis/scheduled-event) listener to the Workers script.

</Aside>

![workers-schedule-editor](./media/workers-schedule-editor.png)

## Supported cron expressions

Cloudflare supports cron expressions with five fields, along with most [Quartz scheduler](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html#introduction)-like cron syntax extensions:

<TableWrap>

Field         | Values  | Characters
--------------|---------|------------
Minute        | 0-59    | * , - /
Hours         | 0-23    | * , - /
Days of Month | 1-31    | * , - / L W
Months        | 1-12, case-insensitive 3-letter abbreviations ("JAN", "aug", etc.) | * , - /
Weekdays      | 1-7, case-insensitive 3-letter abbreviations ("MON", "fri", etc.)  | * , - / L #

</TableWrap>

### Examples

Some common time intervals that may be useful for setting up your Cron Trigger:

<Definitions>

- `* * * * *`
  - Every minute

- `*/30 * * * *`
  - Every 30 minutes

- `0 17 * * sun` or `0 17 * * 1`
  - 5PM on Sunday

- `10 7 * * mon-fri` or `10 7 * * 2-6`
  - 7:10AM on weekdays

- `0 15 1 * *`
  - 3PM on first day of the month

- `0 18 * * 6L` or `0 18 * * friL`
  - 6PM on the last Friday of the month

- `23 59 LW * *`
  - 11:59PM on the last weekday of the month

</Definitions>

<Aside type="note" header="Testing Cron Triggers and potential delays">

A recommended way for testing your Cron Trigger is to first deploy it to a test domain. Adding a new Cron Trigger, updating an old Cron Trigger, or deleting a Cron Trigger may take minutes for changes to propagate to the Cloudflare network edge.

</Aside>

## Viewing past events

Users can review the execution history of their Cron Triggers in **Past Events** under [**Triggers**](https://dash.cloudflare.com/?to=/:account/workers) or through Cloudflare's [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api).

![workers-past-events](./media/workers-past-events.png)

It can take up to 30 minutes before events are displayed in **Past Events** when creating a new Worker or changing a Worker's name.

Refer to [Metrics and Analytics](/learning/metrics-and-analytics) for more information.