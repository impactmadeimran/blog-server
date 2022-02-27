const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const dbURI = process.env.MONGODB_URI;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/Images",express.static('Images'));


app.use(express.json());

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected to db")
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    })
}).catch(err => {
    console.log(err)
})
app.get('/', (req, res) => {
    res.send("Welcome to my server")
})

app.use(authRoutes, postRoutes)