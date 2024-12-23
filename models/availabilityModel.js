// const mongoose = require('mongoose');

// // Define the schema
// const availabilitySchema = new mongoose.Schema({
//     resourceName: { type: String, required: true },
//     total: { type: Number, required: true },
//     available: { type: Number, required: true },
// });

// // Model
// const Availability = mongoose.model('Availability', availabilitySchema);

// // Initialize default resources
// const initializeResources = async () => {
//     const defaultResources = [
//         { resourceName: 'Study rooms', total: 3, available: 3 },
//         { resourceName: 'Labs', total: 3, available: 3 },
//         { resourceName: 'Sports equipment', total: 3, available: 3 },
//     ];

//     for (const resource of defaultResources) {
//         const existingResource = await Availability.findOne({ resourceName: resource.resourceName });
//         if (!existingResource) {
//             await Availability.create(resource);
//             console.log(`Resource ${resource.resourceName} initialized.`);
//         }
//     }
// };

// // Export model and initialization function
// module.exports = { Availability, initializeResources };
const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    resourceName: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    available: {
        type: Number,
        required: true,
    },
});

// Create the Availability model
const Availability = mongoose.model('Availability', availabilitySchema);

// Initialize resources if they don't exist
const initializeResources = async () => {
    const resources = [
        { resourceName: 'Study Room', total: 3, available: 3 },
        { resourceName: 'Lab', total: 3, available: 3 },
        { resourceName: 'Sports Equipment', total: 3, available: 3 },
    ];

    // Check if resources already exist in the database, if not, initialize them
    for (const resource of resources) {
        const existingResource = await Availability.findOne({ resourceName: resource.resourceName });
        if (!existingResource) {
            await new Availability(resource).save();
        }
    }
};

module.exports = { Availability, initializeResources };
