const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const pokemonRoutes = require('./routes/pokemonRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use('/api/pokemon', pokemonRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
