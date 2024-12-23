const { Availability } = require('../models/availabilityModel'); // Correctly import Availability model

// Fetch available resources
const getAvailableResources = async (req, res) => {
    try {
        const resources = await Availability.findOne();  // Find all resources
        res.status(200).json(resources);
    } catch (error) {
        console.error('Error fetching resources:', error);  // Log the detailed error
        res.status(500).json({
            message: 'Server error',
            error: error.message,  // Send the error message
            stack: error.stack,    // Optionally log the stack trace for debugging
        });
    }
};

// Book a resource
const bookResource = async (req, res) => {
    const { resourceName, quantity } = req.body;

    try {
        const resource = await Availability.findOne({ resourceName });  // Find the resource by name

        if (!resource || resource.available < quantity) {
            return res.status(400).json({ message: 'Insufficient availability' });
        }

        // Update available resource quantity
        resource.available -= quantity;
        await resource.save();

        res.status(200).json({ message: 'Resource booked successfully', resource });
    } catch (error) {
        console.error('Error booking resource:', error);  // Log the detailed error
        res.status(500).json({
            message: 'Server error',
            error: error.message,  // Send the error message
            stack: error.stack,    // Optionally log the stack trace for debugging
        });
    }
};

// Release a resource
const releaseResource = async (req, res) => {
    const { resourceName, quantity } = req.body;

    try {
        const resource = await Availability.findOne({ resourceName });  // Find the resource by name

        if (!resource || resource.available + quantity > resource.total) {
            return res.status(400).json({ message: 'Cannot release more than total resources' });
        }

        // Update available resource quantity
        resource.available += quantity;
        await resource.save();

        res.status(200).json({ message: 'Resource released successfully', resource });
    } catch (error) {
        console.error('Error releasing resource:', error);  // Log the detailed error
        res.status(500).json({
            message: 'Server error',
            error: error.message,  // Send the error message
            stack: error.stack,    // Optionally log the stack trace for debugging
        });
    }
};

module.exports = {
    getAvailableResources,
    bookResource,
    releaseResource,
};
