const eventsDB = require("./db.json");
const { updateDatabase } = require("./utils");
function getAllEvents() {
    return eventsDB.events;
}

function createdNewEvent(newEvent) {
    // Validation check: If event already exists
    const isAlreadyExist =
        eventsDB.events.findIndex((event) => event.name === newEvent.name) > -1;
    if (isAlreadyExist) {
        throw {
            status: 400,
            message: `Event with the name ${newEvent.name} already exists`
        };
    }

    // Pusing new event into DB
    try {
        eventsDB.events.push(newEvent);
        updateDatabase(eventsDB);
        return newEvent;
    } catch (error) {
        throw { 
            status: 500, 
            message: error?.message || error
        };
    }

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
function deleteOneEvent(eventId) {
    // Validation check: Getting the event based on the id
    const eventIndexForDeletion = eventsDB.events.findIndex(
        (event) => event.id === eventId
    );
    if (eventIndexForDeletion === -1) {
        return -1;
    }
    const toDelete = eventsDB.events[eventIndexForDeletion]
    eventsDB.events.splice(eventIndexForDeletion, 1);
    updateDatabase(eventsDB);
    return toDelete;
}
module.exports = {
    getAllEvents,
    createdNewEvent,
    getOneEvent,
    updateOneEvent,
    deleteOneEvent
}