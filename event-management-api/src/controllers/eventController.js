const eventService = require("../services/eventService");

function getAllEvents(req, res) {
    const allEvents = eventService.getAllEvents();
    res.status(201).send({ status: "OK", data: allEvents });
}
function getOneEvent(req, res) {
    // validation check: If eventId exists
    if (!req.params.eventId) {
        return res.status(201).send({ status: "EventId doest not exist", data: "" });
    }

    const event = eventService.getOneEvent(req.params.eventId);
    res.status(201).send({ status: "OK", data: event });
}
function createNewevent(req, res) {
    // Getting event details in JSON
    const { body } = req;

    // validation check: Ensuring all required data is present
    if (!body.name || !body.type || !body.description) {
        return res.status(201).send({ status: "Invalid Data" });
    }

    // Creating event object
    const newEvent = {
        name: body.name,
        type: body.type,
        description: body.description
    }

    // Sending to service layer to create and update the database
    const createdNewEvent = eventService.createNewevent(newEvent);

    res.status(201).send({ status: "OK", data: createdNewEvent });
}

function updateOneEvent(req, res) {
    // validation check: If eventId exists
    if (!req.params.eventId) {
        return res.status(201).send({ status: "EventId doest not exist in params", data: "" });
    }

    // validation check: checking allowed variables for this type of database
    const validVariables = ["name", "type", "description"];
    if (!allowedVariables(req.body, validVariables)) {
        return res.status(201).send({ status: "Attributes doest not match", data: "" });
    }

    const updatedEvent = eventService.updateOneEvent(req.params.eventId, req.body);

    if (updatedEvent === -1) {
        return res.status(201).send({ status: "EventId doest not exist in database", data: "" });
    }
    res.status(201).send({ status: "OK", data: updatedEvent });

}
function deleteOneEvent(req, res) {
    // validation check: If eventId exists
    if (!req.params.eventId) {
        return res.status(201).send({ status: "EventId doest not exist in params", data: "" });
    }
    const deletedEvent = eventService.deleteOneEvent(req.params.eventId);
    if (deletedEvent === -1) {
        return res.status(201).send({ status: "EventId doest not exist in database", data: "" });
    }
    res.status(201).send({ status: "OK", data: deletedEvent });
}

function allowedVariables(body, validVariables) {
    const keys = Object.keys(body);
    for (key of keys) {
        if (!validVariables.includes(key)) return false;
    }
    return true;
}
module.exports = {
    getAllEvents,
    getOneEvent,
    createNewevent,
    updateOneEvent,
    deleteOneEvent
}