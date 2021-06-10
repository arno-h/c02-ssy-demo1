const express = require('express');
const database = require('./database');
const Trip = require('./Trip');
const router = express.Router();

router.get('/:id', getTrip);

function getTrip(req, res) {
    let id = parseInt(req.params.id);
    const tripCollection = database.getCollection('trips');
    const trip = tripCollection.get(id);
    res.json(trip);
}

module.exports = router;