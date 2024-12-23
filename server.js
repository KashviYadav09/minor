// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const { Availability, initializeResources } = require('./models/availabilityModel');
// const availabilityRoutes = require('./routes/availabilityRoutes');


// // Load environment variables from .env file
// dotenv.config();

// const app = express();

// // Middleware to parse incoming JSON data
// app.use(express.json());

// // Database connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(async () => {
//         console.log('Connected to MongoDB');
//         // Initialize resources if they don't exist already
//         await initializeResources();
//     })
//     .catch((err) => {
//         console.error('MongoDB connection failed:', err);
//         process.exit(1);  // Exit process if MongoDB connection fails
//     });

// // Set up routes
// app.use('/api/resources', availabilityRoutes);

// // Start the server
// const PORT = process.env.PORT || 3000;  // Default to 3000 if PORT is not set in .env
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRegister = require('./routes/auth');  // Registration route
const authLogin = require('./routes/authLogin');        // Login route
const { Availability, initializeResources } = require('./models/availabilityModel'); // Resources model and initialization
const availabilityRoutes = require('./routes/availabilityRoutes');  // Availability routes
const cors = require('cors');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse incoming JSON data
app.use(bodyParser.json());
app.use(express.json());  // This is already included in bodyParser, but you can keep both for safety


app.use(cors());

app.use(express.static(path.join(__dirname, 'minor')));
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(async () => {
        console.log('Connected to MongoDB');
        // Initialize resources if they don't exist already
        await initializeResources();
    })
    .catch((err) => {
        console.error('MongoDB connection failed:', err);
        process.exit(1);  // Exit process if MongoDB connection fails
    });

// Use the routes for registration and login
app.use('/api', authRegister);  // Register route: accessible via /api/register
app.use('/api', authLogin);     // Login route: accessible via /api/login

// Set up routes for resource availability
app.use('/api/resources', availabilityRoutes);  // Accessible via /api/resources

// Default route to test the server is running
app.get('/reg', (req, res) => {
    res.sendFile(path.join(__dirname, 'minor', 'reg.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'minor', 'login.html'));
});
app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, 'minor', 'main.html'));
});

app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;  // Default to 5000 if PORT is not set in .env
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
