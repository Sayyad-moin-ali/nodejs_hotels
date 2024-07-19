const express = require('express')
const app = express();
const db = require('./db')
const bodyparser = require('body-parser');
require('dotenv').config();
const passport=require('./Auth')

app.use(bodyparser.json())

app.get("/", function (req, res) {
    res.send("welcome to hotel")
})

app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local', { session: false });

//middleware function
// const logRequest = (req, res, next) => {
//     console.log(`[${new Date().toLocaleString()}] Request made to ${req.originalUrl}`);
//     next();
// };

// Use the logRequest middleware
// app.use(logRequest);


const personRoutes = require("./routes/personRoute")
const menuItemRoute = require("./routes/menuItemRoute");
const person = require('./models/person');

app.use('/person', personRoutes);
app.use("/menu", menuItemRoute)

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`listning on port ${port}`)
})
