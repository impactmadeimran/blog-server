const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const PORT = process.env.PORT || 3001;
const dbURI = "mongodb+srv://alpha:test123@cluster0.maoie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(express.json());

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected to db")
}).catch(err => {
    console.log(err)
})
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

app.use(authRoutes,postRoutes)