function getAllEvents(req,res){
    res.send("Get all Events");
}
function getOneEvent(req,res) {
    res.send("getOneEvent");
}
function createNewevent(req,res) {
    res.send("createNewevent");
}
function updateOneEvent(req,res) {
    res.send("updateOneEvent");
}
function deleteOneEvent(req,res) {
    res.send("deleteOneEvent");
}

module.exports = {
    getAllEvents,
    getOneEvent,
    createNewevent,
    updateOneEvent,
    deleteOneEvent
}