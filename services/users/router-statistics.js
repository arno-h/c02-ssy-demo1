const express = require('express');
const router = express.Router();
const database = require('./database');

router.get('/sum-legs', sumLegs)
router.get('/sum-legs/:color', coloredSumLegs);

const userCollection = database.getCollection('users');

function legStatistics(users) {
    let sumLegs = 0;
    for (let user of users) {
        sumLegs += user.legs;
    }
    return {
        users: users.length,
        sum_legs: sumLegs,
        avg_legs: sumLegs / users.length
    };
}

function sumLegs(req, res) {
    let allUsers = userCollection.find();
    res.json(legStatistics(allUsers));
}

function coloredSumLegs(req, res) {
    let colorUsers = userCollection.find({color: req.params.color});
    res.json(legStatistics(colorUsers));
}

module.exports = router;
