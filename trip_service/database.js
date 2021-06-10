const Loki = require("lokijs");
const Trip = require('./Trip');

const db = new Loki('trip.json');
const trips = db.addCollection('trips');

trips.insert(new Trip('2021-06-11', '2021-06-24', 'Stockholm', [1, 3]));
trips.insert(new Trip('2021-07-20', '2021-08-01', 'Barcelona', [2]));
trips.insert(new Trip('2021-12-08', '2021-12-12', 'St. Anton', [1,2,3]));

module.exports = db;
