const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

router.get('/user-coins', async (req, res) => {
  const uid = 'testUser123'; // your test user ID
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(userDoc.data());
  } catch (err) {
    res.status(500).json({ error: 'Firestore read failed' });
  }
});

module.exports = router;
