const Loki = require("lokijs");
const User = require('./User');

const db = new Loki('demo.json');
const users = db.addCollection('users');

users.insert(new User('Sleipnir', 8)); // pk=1
users.insert(new User('Jormungandr', 0)); // pk=2
users.insert(new User('Hel', 2)); // pk=3

module.exports = db;