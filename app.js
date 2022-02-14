const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const dbURI = "mongodb+srv://alpha:test123@cluster0.maoie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(bodyParser.json());
app.use(cors());

app.use(express.json());

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected to db")
}).catch(err => {
    console.log(err)
})
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
app.get('/', (req, res) => {
    res.send("Welcome to my server")
})

app.use(authRoutes, postRoutes)