// scrape.js route example
const express = require('express');
const { db } = require('./firebase');
const authMiddleware = require('./authMiddleware');

const router = express.Router();

router.post('/scrape', authMiddleware, async (req, res) => {
  const uid = req.user.uid;

  const userDoc = await db.collection('users').doc(uid).get();
  if (!userDoc.exists) return res.status(404).json({ error: 'User not found' });

  const userData = userDoc.data();
  if (userData.coins <= 0) {
    return res.status(400).json({ error: 'Insufficient coins' });
  }

  try {
    // 👉 Do your scraping logic here
    // On successful scrape:
    await db.collection('users').doc(uid).update({ coins: userData.coins - 1 });
    res.status(200).json({ message: 'Scrape successful!' });

  } catch (error) {
    res.status(500).json({ error: 'Scraping failed' });
  }
});

module.exports = router;
