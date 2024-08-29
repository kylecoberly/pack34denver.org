/**
* This is just a pass-through from a calendar in Google Calendar, to something that the web app can consume without CORS issues
*/
function doGet(e) {
  const startDate = new Date(Date.now());
  const endDate = new Date(Date.now() + 1000*60*60*24*(e?.parameter?.daysInAdvance || 365)); // as many days as requested, or a year from now
  const calendar = CalendarApp.getCalendarById('1mgg9ctm1i6477tkbk035roe67l43mj8@import.calendar.google.com') // this is a GCal that's a subscription to the Advancement's `ics`, and allows this script to read it

  const events = calendar
    .getEvents(startDate, endDate)
    .filter((event) => !event.getDescription().includes("[Not public]"))
    .map((event) => {
      const location = event.getLocation() === "Location was not specified" || event.getLocation() === "None" ? null : event.getLocation();
      return {
        title: event.getTitle(),
        location,
        startTime: event.getStartTime(),
        endTime: event.getEndTime()
      }
    });

  return ContentService.createTextOutput(JSON.stringify({events: events})).setMimeType(ContentService.MimeType.JSON);
}
