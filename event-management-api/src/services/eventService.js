const events = require("../database/event");

const { v4: uuid } = require("uuid");

function getAllEvents(){
    const allEvents = events.getAllEvents();
    return allEvents;
}
function getOneEvent(eventId) {
    const singleEvent = events.getOneEvent(eventId);
    return singleEvent;
}
function createNewevent(newEvent) {
    // Updating the payload: Adding id, createdAt and updatedAt 
    const eventToInsert = {
        ...newEvent,
        id: uuid(),
        createdAt: new Date().toLocaleString("en-US", { timeZone: "Europe/London" }),
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "Europe/London" }),
      };

    // updated object going to database layer to update the database
    const createdEvent = events.createdNewEvent(eventToInsert);

    return createdEvent
}
function updateOneEvent(eventId, eventChanges) {
    const updatedEvent = events.updateOneEvent(eventId, eventChanges);
    return updatedEvent
}
function deleteOneEvent() {
    return
}

module.exports = {
    getAllEvents,
    getOneEvent,
    createNewevent,
    updateOneEvent,
    deleteOneEvent
}