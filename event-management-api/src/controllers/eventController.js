const eventService = require("../services/eventService");

function getAllEvents(req, res) {
    const allEvents = eventService.getAllEvents();
    res.status(201).send({ status: "OK", data: allEvents });
}
function getOneEvent(req, res) {
    const event = eventService.getOneEvent();
    res.send("getOneEvent");
}
function createNewevent(req, res) {
    // Getting event details in JSON
    const { body } = req;

    // validation check: Ensuring all required data is present
    if (!body.name || !body.type || !body.description) {
        return res.status(201).send({status:"Invalid Data"});
    }

    // Creating event object
    const newEvent = {
        name: body.name,
        type: body.type,
        description: body.description
    }

    // Sending to service layer to create and update the database
    const createdNewEvent = eventService.createNewevent(newEvent);

    res.status(201).send({status:"OK",data:createdNewEvent});
}
function updateOneEvent(req, res) {
    const updatedEvent = eventService.updateOneEvent();
    res.send("updateOneEvent");
}
function deleteOneEvent(req, res) {
    const deletedEvent = eventService.deleteOneEvent();
    res.send("deleteOneEvent");
}

module.exports = {
    getAllEvents,
    getOneEvent,
    createNewevent,
    updateOneEvent,
    deleteOneEvent
}