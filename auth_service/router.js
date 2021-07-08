const express = require('express');
const database = require('./database');
const router = express.Router();
const authLib = require('./lib');

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
    const token = authLib.generateToken(auth);
    res.json({
        token: token
    });
}

router.post('/verify', verify);

function verify(req, res) {
    const token = req.body.token;
    const result = authLib.verify(token);
    if (result === null)
        res.status(403).end();
    else
        res.json(result);
}

module.exports = router;
