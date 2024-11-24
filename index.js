const express = require('express');
const cors = require("cors");
const app = express();
const port = 3010;

app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');

require("dotenv").config();

const mongoose = require("mongoose");
const MONGO_DB_URI = process.env.MONGO_DB_URI;
mongoose.connect( MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, } );

app.get('/', (req, res) => {
  const impresiones = [
    { id: 1, nombre: 'Modelo #1', descripcion: 'Arbol de Navidad: Plantilla para armar tu propio árbol de navidad', imagenUrl: 'https://i.imgur.com/wZ3Igwp.jpeg' },
    // { id: 2, nombre: 'Modelo #2', descripcion: 'Arbol de Navidad', imagenUrl: 'https://i.imgur.com/wZ3Igwp.jpeg' }
  ];
  res.render('index', { impresiones });
});

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/task', taskRoutes);

const gpt4oRequestRoutes = require('./routes/gpt4oRequestRoutes');
app.use('/api/gpt4o', gpt4oRequestRoutes);

const whisperWordRoutes = require('./routes/whisperWordRoutes');
app.use('/api/whisperWord', whisperWordRoutes);

const expenseRoutes = require('./routes/expenseRoutes');
app.use('/api/expenses', expenseRoutes);

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

const cartItemsRoutes = require('./routes/cartItemsRoutes');
app.use('/api/cartItems', cartItemsRoutes);

const inventoryItemsRoutes = require('./routes/inventoryItemsRoutes');
app.use('/api/inventoryItems', inventoryItemsRoutes);

const sourceRoutes = require('./routes/sourceRoutes');
app.use('/api/source', sourceRoutes);

const trackingItemsRoutes = require('./routes/trackingItemsRoutes');
app.use('/api/trackingItems', trackingItemsRoutes);

const purchaseItemStoryRoutes = require('./routes/purchaseItemStoryRoutes');
app.use('/api/purchaseItemStory', purchaseItemStoryRoutes);

const consumptionRoutes = require('./routes/consumptionRoutes');
app.use('/api/consumption', consumptionRoutes);

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});