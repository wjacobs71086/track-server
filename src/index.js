require('./Models/User');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/authRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./Middlewares/requireAuth');

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);

// String that allows the connection to the MongoDB. Created by generating a new cluster.
const mongoUri = 'mongodb+srv://admin:Password123!@cluster0-dm14h.mongodb.net/test?retryWrites=true&w=majority';

// These avoid common error messages. unsure what they do.
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
});

// Creates a listener that when the DB is connected, executes the callback.
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB instance.')
});

// This will show an error when one appears
mongoose.connection.on('error', (err) => {
  console.log({ErrorMessage: err});
});

app.get('/', requireAuth,(req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('i hear you on port 3000')
})