// validation error: 403 HTTP status code.
// Not found error: 404
const eventService = require("../services/eventService");

function getAllEvents(req, res) {
    try {

        const allEvents = eventService.getAllEvents();
        res.status(201).send({
            status: "OK",
            data: allEvents
        });

    } catch (error) {

        res.status(error?.status || 400).send({
            status: "ERROR",
            err: {
                message: error?.message || "Error in getting All events from database.",
            }
        });

    }

}
function getOneEvent(req, res) {
    // validation check: If eventId exists
    if (!req.params.eventId) {

        return res.status(403).send({
            status: "ERROR",
            err: {
                message: "eventId is missing from req body",
            }
        });

    }
    try {

        const event = eventService.getOneEvent(req.params.eventId);
        res.status(201).send({ status: "OK", data: event });

    } catch (error) {

        res.status(error?.status || 400).send({
            status: "ERROR",
            err: {
                message: error?.message || "Error in getting one event based on eventId"
            }
        });

    }
}
function createNewevent(req, res) {
    // Getting event details in JSON
    const { body } = req;

    // validation check: checking allowed variables for this type of database
    const validVariables = ["name", "type", "description"];
    if (!allowedVariables(body, validVariables)) {

        return res.status(403).send({ 
            status: "ERROR",
            err: {
                message:"Attributes should only be three, which are name, type, and description"
            }
        });

    }
    // validation check: Ensuring all required data is present
    if (!body.name || !body.type || !body.description) {
        return res.status(403).send({
            status: "ERROR",
            err: {
                message: "one of the following keys are missing in request body: name, type, description"
            }
        });
    }

    // Creating event object
    const newEvent = {
        name: body.name,
        type: body.type,
        description: body.description
    }

    // Sending to service layer to create and update the database
    try {
        const createdNewEvent = eventService.createNewevent(newEvent);
        res.status(201).send({ status: "OK", data: createdNewEvent });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: {
                error: error?.message || "Erro in creating a new event"
            }
        });
    }

}

function updateOneEvent(req, res) {
    // validation check: If eventId exists
    if (!req.params.eventId) {
        return res.status(403).send({
            status: "ERROR",
            err: {
                message: "eventId is missing from req body",
            }
        });
    }

    // validation check: checking allowed variables for this type of database
    const validVariables = ["name", "type", "description"];
    if (!allowedVariables(req.body, validVariables)) {

        return res.status(403).send({ 
            status: "ERROR",
            err: {
                message:"Attributes doest not match with the event details, it should be name, type or description"
            }
        });

    }
    try {
        
        const updatedEvent = eventService.updateOneEvent(req.params.eventId, req.body);
        // if event id does not exist in the database
        if (updatedEvent === -1) {
            return res.status(404).send({ 
                status: "ERROR",
                err : {
                    message:`Event with ID: ${req.params.eventId} does not exist in the database`
                }
            });
        }
        return res.status(201).send({ status: "OK", data: updatedEvent });

    } catch (error) {
        
        return res.status(error?.status || 400).send({
            status:"ERROR",
            err: {
                message:error?.message || `Unexpected error when updating existing event with eventId ${req.params.eventId}`
            }
        });

    }


}
function deleteOneEvent(req, res) {
    // validation check: If eventId exists
    if (!req.params.eventId) {
        return res.status(403).send({
            status: "ERROR",
            err: {
                message: "eventId is missing from req body",
            }
        });
    }

    try {
        
        const deletedEvent = eventService.deleteOneEvent(req.params.eventId);
        if (deletedEvent === -1) {
            return res.status(404).send({ 
                status: "ERROR",
                err : {
                    message:`Event with ID: ${req.params.eventId} does not exist in the database`
                }
            });
        }
        return res.status(201).send({ status: "OK", data: deletedEvent });

    } catch (error) {
        
        return res.status(error?.status || 400).send({
            status:"ERROR",
            err : {
                message : error?.message || `Unexpected error when deleting existing event with eventId ${req.params.eventId}`
            }
        });
    }

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