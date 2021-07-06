const Loki = require("lokijs");
const User = require('./User');

const db = new Loki('users.json');
const users = db.addCollection('users');

users.insert(new User('Sleipnir', 8, 'mint'));
users.insert(new User('Jormungandr', 0, 'crimson'));
users.insert(new User('Hel', 2, 'fuchsia'));

module.exports = db;
