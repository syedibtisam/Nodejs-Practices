const eventsDB = require("./db.json");
const { updateDatabase } = require("./utils");
function getAllEvents() {
    return eventsDB.events;
}

function createdNewEvent(newEvent) {
    // Validation check: If event already exists
    const isAlreadyAdded =
        eventsDB.events.findIndex((event) => event.name === newEvent.name) > -1;
    if (isAlreadyAdded) {
        return;
    }
    // Pusing new event into DB
    eventsDB.events.push(newEvent);
    updateDatabase(eventsDB);

    return newEvent;
}
function getOneEvent(eventId) {
    const event = eventsDB.events.find((event) => event.id === eventId);
    if (!event) {
        return "EventID does not exist";
    }
    return event;
}

function updateOneEvent(eventId, eventChanges) {
    // Validation check: Getting the event based on the id
    const eventIndexForUpdate = eventsDB.events.findIndex(
        (event) => event.id === eventId
    );
    if (eventIndexForUpdate === -1) {
        return -1;
    }
    console.log("event changes");
    console.log(eventChanges);
    // merging the new event details with the old one, along with updating the updatedAt time
    const updatedEvent = {
        ...eventsDB.events[eventIndexForUpdate],
        ...eventChanges,
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "Europe/London" }),
    };
    eventsDB.events[eventIndexForUpdate] = updatedEvent;
    updateDatabase(eventsDB);
    return updatedEvent;
}
module.exports = {
    getAllEvents,
    createdNewEvent,
    getOneEvent,
    updateOneEvent
}