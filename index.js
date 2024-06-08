const express = require('express');
const cors = require("cors");
const app = express();
const port = 3010;

app.use(cors());
app.use(express.json());

require("dotenv").config();

const mongoose = require("mongoose");
const MONGO_DB_URI = process.env.MONGO_DB_URI;
mongoose.connect( MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, } );

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/task', taskRoutes);

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});