require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserRouter = require('./Routes/UserRouter');
const ContactRouter = require('./Routes/ContactRouter');

const app = express()

PORT=4000

app.use(cors()); 
app.use(express.json());
app.use("/user", UserRouter)
app.use("/contact", ContactRouter)

mongoose.connect(
    process.env.CONNECTION_STRING
)

.then(() => console.log("Connected to Database")) 

.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });}
)

.catch((err) => console.log(err));