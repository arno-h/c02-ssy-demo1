const express = require('express');
const database = require('../src/database');
const router = express.Router();

// complete URL:
// http://localhost:3000/users/17
//            bin/www   app.js users.js
router.get('/:id', getSingleUser);

function getSingleUser(req, res) {
    const id = parseInt(req.params.id);
    const userCollection = database.getCollection('users');
    const user = userCollection.get(id); // SELECT * FROM users WHERE id=...
    res.json(user);
}

// GET http://localhost:3000/users/
// { "Sleipnir": 1, "Jormungandr": 2, "Hel": 3 }

router.get('/', listAllUsers);

function listAllUsers(req, res) {
    const userCollection = database.getCollection('users');
    const allUsers = userCollection.find(); // SELECT * FROM users;
    const result = { };
    for (let user of allUsers) {
        // result.Sleipnir = 1;
        result[user.name] = user.$loki;
    }
    res.json(result);
}


module.exports = router;
