const express = require('express');
// const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3006;
// const dbURI = process.env.MONGODB_URI;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/Images", express.static('Images'));


app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
//     console.log("connected to db")
// }).catch(err => {
//     console.log(err)
// })
app.get('/', (req, res) => {
    res.send("Wrong page!!!")
})

app.use(authRoutes, postRoutes)

// module.exports = supabase