const express = require('express');
const router = express.Router();
const database = require('./database');
const User = require('./User');

router.get('/', getAllUsers)
router.get('/:id', getSingleUser);
router.delete('/:id', deleteUser);
router.post('/', createUser);
router.patch('/:id', updateUser);

const userCollection = database.getCollection('users');

function getAllUsers(req, res) {
    let allUsers;
    if ('minLegs' in req.query) {
        let minLegs = parseInt(req.query.minLegs);

        function filterMinlegs(user) {
            return (user.legs >= minLegs);
        }

        allUsers = userCollection.where(filterMinlegs);
    } else {
        allUsers = userCollection.find();
    }
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
    let user = new User(req.body.name, req.body.legs, req.body.color);
    userCollection.insert(user);
    res.json(user);
}

function updateUser(req, res) {
    let user_id = parseInt(req.params.id);
    let user = userCollection.get(user_id);
    // instead as loop (assuming only known attributes are in req.body)
    for (let attribute of Object.keys(req.body)) {
        user[attribute] = req.body[attribute];
    }
    userCollection.update(user);
    res.json(user);
}

module.exports = router;
