// backend/index.js

const express = require('express');
const cors = require('cors');
const { admin, db } = require('./firebase'); // your firebase.js init file
const app = express();

app.use(cors());
app.use(express.json());

// Auth middleware to verify Firebase ID tokens
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split('Bearer ')[1];
  if (!token) return res.status(401).json({ error: 'Malformed token' });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Test route: check coins for a given user (for dev/testing)
app.get('/test-user-coins', async (req, res) => {
  // Replace with actual UID or pass UID dynamically in real usage
  const uid = 'testUser123';
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(userDoc.data());
  } catch (err) {
  console.error('Firestore read failed:', err); // <-- log the error
  res.status(500).json({ error: 'Firestore read failed' });
  }
});

// Protected scrape route example
app.post('/scrape', authMiddleware, async (req, res) => {
  const uid = req.user.uid;

  try {
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();

    if (!userData.coins || userData.coins <= 0) {
      return res.status(400).json({ error: 'Insufficient coins' });
    }

    // TODO: Your Playwright scraping logic here
    // For now, just simulate a successful scrape:
    const scrapeSuccess = true;

    if (scrapeSuccess) {
      await userRef.update({ coins: userData.coins - 1 });
      return res.status(200).json({ message: 'Scrape successful, 1 coin deducted.' });
    } else {
      return res.status(500).json({ error: 'Scrape failed.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

const testRoutes = require('./routes/testRoutes');
app.use('/test', testRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
