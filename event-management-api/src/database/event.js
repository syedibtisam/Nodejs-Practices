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

module.exports = {
    getAllEvents,
    createdNewEvent
}