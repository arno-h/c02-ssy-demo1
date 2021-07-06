const express = require('express');
const router = express.Router();
const database = require('./database');
const User = require('./User');

router.get('/', getAllUsers)
router.get('/:id', getSingleUser);
router.delete('/:id', deleteUser);
router.post('/', createUser);

const userCollection = database.getCollection('users');

function getAllUsers(req, res) {
    let allUsers = userCollection.find();
    let result = [];
    for (let user of allUsers) {
        result.push({
            name: user.name,
            id: user.$loki
        });
    }
    res.json(result);
}

function getSingleUser(req, res) {
    let user_id = parseInt(req.params.id);
    let user = userCollection.get(user_id);
    res.json(user);
}

function deleteUser(req, res) {
    let user_id = parseInt(req.params.id);
    let user = userCollection.get(user_id);
    userCollection.remove(user);
    res.json(user);
}

function createUser(req, res) {
    let user = new User(req.body.name, req.body.legs);
    userCollection.insert(user);
    res.json(user);
}

module.exports = router;
