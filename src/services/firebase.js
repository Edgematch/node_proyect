
var admin = require("firebase-admin");

var serviceAccount = require('../certs/firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin
