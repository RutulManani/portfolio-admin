require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

// Import route files
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');
const apiRoutes = require('./routes/api');

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => res.redirect('/projects')); // Redirect root to /projects
app.use('/projects', projectRoutes);
app.use('/skills', skillRoutes);
app.use('/api', apiRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});