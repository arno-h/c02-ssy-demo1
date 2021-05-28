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

module.exports = router;
