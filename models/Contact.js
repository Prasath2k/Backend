// models/Contact.js
const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    phoneNumbers: [{
      type: String,
      unique: true, // This ensures phone numbers are unique across all documents
      required: true,
    }],
    image: String, // Image can be stored as a URL or a path
  });
  
module.exports = mongoose.model('Contact', contactSchema);
