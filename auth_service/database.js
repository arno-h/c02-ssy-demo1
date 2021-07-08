const Loki = require("lokijs");
const Auth = require('./Auth');

const db = new Loki('demo.json');
const authCollection = db.addCollection('auth');

authCollection.insert(new Auth('sleipnir@example.com', "password123", "admin")); // pk=1
authCollection.insert(new Auth('jm@example.net', "open-sesame", "member")); // pk=2
authCollection.insert(new Auth('hel@example.org', "12345678", "customer")); // pk=3

module.exports = db;