const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const pokemonRoutes = require('./routes/pokemonRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React app (if you have a build folder)
// This is useful if you want to serve your frontend from the same server
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API Routes
app.use('/api/pokemon', pokemonRoutes);

// The "catchall" handler: for any request that doesn't match the above, send back the React app's index.html file.
// This is useful for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
