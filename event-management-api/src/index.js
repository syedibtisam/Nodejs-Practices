const express = require("express");

const v1EventRouter = require("./v1/routes/eventRoutes")

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("its working")
});

app.use("/api/v1/events", v1EventRouter);

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})