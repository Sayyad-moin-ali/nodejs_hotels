const express = require('express')
const app = express();
const db = require('./db')
const bodyparser = require('body-parser')

app.use(bodyparser.json())

app.get("/", function (req, res) {
    res.send("welcome to hotel")
})

const personRoutes = require("./routes/personRoute")
const menuItemRoute = require("./routes/menuItemRoute")

app.use('/person', personRoutes);
app.use("/menu", menuItemRoute)

app.listen(3000, () => {
    console.log("listning on port 3000")
})