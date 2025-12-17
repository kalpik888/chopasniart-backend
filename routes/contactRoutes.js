const express = require('express');
const router = express.Router();
const { createContact, getContacts } = require('../controllers/contactController');

// POST request to submit the form
router.post('/', createContact);

// GET request to read messages (Internal use only)
router.get('/', getContacts);

module.exports = router;