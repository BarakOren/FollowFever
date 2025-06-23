const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // download this from Firebase console under "Project settings" → "Service accounts"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = { admin, db };