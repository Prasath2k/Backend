const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Access the PORT and MONGODB_URI from the .env file
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Check if MONGODB_URI is provided
if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable in .env file");
  process.exit(1); // Stop the application with an error code
}

// Connect to MongoDB with revised options
mongoose.connect(MONGODB_URI)
.then(() => console.log('Successfully connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Hello, your server is up and running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Use routes
app.use('/api', contactRoutes);

