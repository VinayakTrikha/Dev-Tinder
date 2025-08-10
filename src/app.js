const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
    res.send("whatsup!!!")
})

app.listen(8000, () => console.log("Server startedclear"));
