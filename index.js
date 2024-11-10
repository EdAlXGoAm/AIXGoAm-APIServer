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

const gpt4oRequestRoutes = require('./routes/gpt4oRequestRoutes');
app.use('/api/gpt4o', gpt4oRequestRoutes);

const whisperWordRoutes = require('./routes/whisperWordRoutes');
app.use('/api/whisperWord', whisperWordRoutes);

const caducidadRoutes = require('./routes/caducidadRoutes');
app.use('/api/caducidad', caducidadRoutes);

const estadoRoutes = require('./routes/estadoRoutes');
app.use('/api/estado', estadoRoutes);

const param_configRoutes = require('./routes/param_configRoutes');
app.use('/api/param_config', param_configRoutes);

const articuloRoutes = require('./routes/articuloRoutes');
app.use('/api/articulo', articuloRoutes);

const operationRoutes = require('./routes/operationRoutes');
app.use('/api/operation', operationRoutes);

const relatedOperationsRoutes = require('./routes/relatedOperationsRoutes');
app.use('/api/relatedOperations', relatedOperationsRoutes);

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});