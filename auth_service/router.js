const express = require('express');
const database = require('./database');
const Auth = require('./Auth');
const router = express.Router();

router.post('/login', login);
/*
Body:
    {
        "username": "....",
        "password": "...."
    }
 */

function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const authCollection = database.getCollection('auth');
    const auth = authCollection.findOne({username: username});
    if (auth === null || auth.password !== password) {
        res.status(403).end();
        return;
    }
    // Token
    const token = JSON.stringify({
        user: auth.$loki,
        role: auth.role,
        version: "1.0"
    });
    res.json({
        token: token
    });
}

module.exports = router;