// controllers/contactsController.js
const Contact = require('../models/Contact');
const { parse } = require('json2csv'); // Import json2csv's parse method

exports.createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send(contact);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).send(contacts);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).send();
    }
    res.status(200).send(contact);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!contact) {
      return res.status(404).send();
    }
    res.status(200).send(contact);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).send();
    }
    res.status(200).send(contact);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.searchContacts = async (req, res) => {
  const searchQuery = req.query.search;
  try {
    const contacts = await Contact.find({
      $or: [
        { name: new RegExp(searchQuery, 'i') }, // Case-insensitive regex search for name
        { phoneNumbers: searchQuery } // Direct match for phone number
      ]
    });
    res.status(200).send(contacts);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.exportContactsToCSV = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        const csv = parse(contacts, { fields: ['name', 'phoneNumbers', 'imagePath'] }); // Specify fields to include in CSV
        res.header('Content-Type', 'text/csv');
        res.attachment("contacts.csv");
        return res.send(csv);
    } catch (error) {
        res.status(500).send(error);
    }
};
