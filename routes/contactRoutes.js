const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Store files in 'uploads' directory at the root
const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

// Using multer middleware for image uploads in create and update contact routes
// The 'image' here should match the name attribute in your file input field in the client-side form
router.post('/contacts', upload.single('image'), contactsController.createContact);
router.get('/contacts', contactsController.getAllContacts);

// Ensure the search route is placed before any parameterized routes like '/contacts/:id'
router.get('/contacts/search', contactsController.searchContacts);

router.get('/contacts/:id', contactsController.getContact);

// Apply multer on update route as well, to handle cases where the contact's image might be updated
router.patch('/contacts/:id', upload.single('image'), contactsController.updateContact);
router.delete('/contacts/:id', contactsController.deleteContact);

router.get('/contacts/export', contactsController.exportContactsToCSV);

module.exports = router;


