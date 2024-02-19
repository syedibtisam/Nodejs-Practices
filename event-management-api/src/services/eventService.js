const events = require("../database/event");

const { v4: uuid } = require("uuid");

function getAllEvents() {
    try {
        
        const allEvents = events.getAllEvents();
        return allEvents;

    } catch (error) {

        throw error

    }

}
function getOneEvent(eventId) {
    try {

        const singleEvent = events.getOneEvent(eventId);
        return singleEvent;

    } catch (error) {
        
        throw error
    }

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
    try {

        const createdEvent = events.createdNewEvent(eventToInsert);
        return createdEvent;

    } catch (error) {
        throw error;
    }

}
function updateOneEvent(eventId, eventChanges) {
    try {
        
        const updatedEvent = events.updateOneEvent(eventId, eventChanges);
        return updatedEvent;

    } catch (error) {
        
        throw error;

    }

}
function deleteOneEvent(eventId) {
    try {

        const deletedEvent = events.deleteOneEvent(eventId);
        return deletedEvent;

    } catch (error) {
        
        throw error;
        
    }

}

module.exports = {
    getAllEvents,
    getOneEvent,
    createNewevent,
    updateOneEvent,
    deleteOneEvent
}