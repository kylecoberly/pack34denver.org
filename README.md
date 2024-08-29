# pack34denver.org

Website for Cub Scout pack 34 in Denver, CO.

## Calendar integration
The calendar integration works thanks to a [Google Apps Script](https://script.google.com/), which
acts as a proxy between [Advancement's calendars](https://advancements.scouting.org), a Google Calendar,
and this website. This is necessary to avoid being blocked by CORS.

The basic architecture is:

- Advancement publishes an `ics`
- A Google Calendar account subscribes to it
- An Apps Script gets access to the Google Calendar, does filtering/cleanup and exposes an API
- The website calls the API and displays the events

To make changes, you'd need to:

1. Make the code changes to `web_calendar.gs`
2. Copy the code to Google Apps Script
3. Make a new Google Apps Script deployment
4. Replace the deployment's URL in `index.html`'s `apiUrl`
