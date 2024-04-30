const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { string } = require('i/lib/util');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB Atlas database
const uri = 'mongodb+srv://admin:admin@cluster0.o2bsnim.mongodb.net/login_page?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'Connection error:'));
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define User schema and model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
// Define Payment schema and model

const paymentSchema = new mongoose.Schema({
  userId:  String,
  amount: Number,
  paymentMethod: String,
  transactionId: String,
  datetime: Date
});

const Payment = mongoose.model('Payment', paymentSchema);


// Route for storing payment details
app.post('/payments', (req, res) => {
  const { userId, amount, paymentMethod, transactionId, datetime } = req.body;

  const newPayment = new Payment({
    userId: userId,
    amount: amount,
    paymentMethod: paymentMethod,
    transactionId: transactionId,
    datetime: datetime
});

  newPayment.save()
      .then(savedPayment => {
          console.log('Payment data saved successfully:', savedPayment);
          res.status(200).json({ success: true, message: 'Payment data saved successfully' });
      })
      .catch(err => {
          console.error('Error saving payment data:', err);
          res.status(500).json({ success: false, message: 'Failed to save payment data' });
      });
});

const securitySchema = new mongoose.Schema({
  name: String,
  bankId: String,
  email: String,
  cifNo: String,
  issueDescription: String
});

app.post('/security', (req, res) => {
  const { name, bankId, email, cifNo, issueDescription } = req.body;

  const newSecurityData = new Security({
      name: name,
      bankId: bankId,
      email: email,
      cifNo: cifNo,
      issueDescription: issueDescription
  });

  newSecurityData.save()
      .then(savedData => {
          console.log('Security data saved successfully:', savedData);
          res.status(200).json({ success: true, message: 'Security data saved successfully' });
      })
      .catch(err => {
          console.error('Error saving security data:', err);
          res.status(500).json({ success: false, message: 'Failed to save security data' });
      });
});

const User = mongoose.model('User', userSchema);
const Security = mongoose.model('Security', securitySchema);

// Routes
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Query the database to check if the provided email and password match any user
  User.findOne({ email, password })
      .then(user => {
          if (!user) {
              res.status(401).json({ error: 'Incorrect email or password' });
          } else {
              res.status(200).json({ success: true, userId: user._id, user });
          }
      })
      .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'User does not exists' });
      });
});


app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  // Check if the email is already registered
  User.findOne({ email })
      .then(existingUser => {
          if (existingUser) {
              res.status(400).json({ error: 'Email is already registered' });
          } else {
              // Create a new user instance
              const newUser = new User({ name, email, password });
              
              // Save the new user to the database
              newUser.save()
                  .then(savedUser => {
                      res.status(200).json({ success: true, user: savedUser });
                  })
                  .catch(err => {
                      console.error(err);
                      res.status(500).json({ error: 'Internal server error' });
                  });
          }
      })
      .catch(err => {
          console.error(err);
          res.status(200).json({ error: 'User already present' });
      });
});

// get transaction details

app.get('/transactions/:userId', (req, res) => {
  const userId = req.params.userId;

  // Query the database to fetch transaction details based on userId
  Payment.find({ userId })
  .then(transactions => {
      // Send transaction details to the frontend
      res.status(200).json(transactions);
  })
  .catch(error => {
      console.error('Error fetching transaction details:', error);
      res.status(500).json({ error: 'Internal server error' });
  });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
