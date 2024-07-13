const path = require("path");
const express = require('express');
const app = express();
const db = require('./config/db.config');
const serverConfig = require('./config/server.config');

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Initialize database and start server
const startServer = async () => {
  try {
    await db.initialize();

    // Routes
    // Serve index.html
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    // Handle signup form submission
    app.post('/signup', async (req, res) => {
      const { name, email, contact, address, password } = req.body;

      try {
        // Insert data into the UNIT table
        const result = await db.insertUser(name, email, contact, address, password);

        console.log('User inserted:', result);

        // Send a success response
        res.status(200).send('User signed up successfully!');
      } catch (err) {
        console.error('Error signing up:', err);
        res.status(500).send('Error signing up. Please try again later.');
      }
    });

    // Start the server
    app.listen(serverConfig.port, serverConfig.hostname, () => {
      console.log(`Server running at http://${serverConfig.hostname}:${serverConfig.port}/`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
  }
};

startServer();

process.on('SIGINT', async () => {
  await db.close();
  process.exit(0);
});
