const express = require("express")
const connection= require("./connection")
const path = require("path")
const cors = require("cors")

const app = express()
const routes = require("./routes/routes.js");
const PORT = process.env.PORT || 3000
require("dotenv").config()
connection()

app.use(express.static("dist"))



app.use(express.json())
app.use(cors());
app.use("/", routes);


app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})