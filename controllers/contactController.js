const Contact = require('../models/Contact');

// @desc    Submit a new contact enquiry
// @route   POST /api/contact
const createContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Basic Validation
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Please include all required fields' });
        }

        // Create new contact document
        const newContact = new Contact({
            name,
            email,
            phone, // If this is undefined/empty, it will be ignored or null, which is fine
            message
        });

        // Save to Database
        const savedContact = await newContact.save();

        res.status(201).json({
            success: true,
            data: savedContact,
            message: 'Enquiry submitted successfully'
        });

    } catch (error) {
        console.error("Error saving contact:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Optional: specific controller to view all messages (for your Admin Panel later)
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = { createContact, getContacts };