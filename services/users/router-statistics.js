const express = require('express');
const router = express.Router();
const database = require('./database');

router.get('/sum-legs', sumLegs)

const userCollection = database.getCollection('users');

function sumLegs(req, res) {
    let allUsers = userCollection.find();
    let sumLegs = 0;
    for (let user of allUsers) {
        sumLegs += user.legs;
    }
    res.json({
        users: allUsers.length,
        sum_legs: sumLegs,
        avg_legs: sumLegs / allUsers.length
    });
}

module.exports = router;
