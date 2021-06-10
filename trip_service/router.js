const Axios = require('axios');
const express = require('express');
const database = require('./database');
const router = express.Router();

router.get('/:id', getTrip);
// http://.../trips/3?names=true

async function getTrip(req, res) {
    let id = parseInt(req.params.id);
    const tripCollection = database.getCollection('trips');
    const trip = tripCollection.get(id);
    // const result = Object.assign({}, trip); // (shallow) clone trip object
    const result = { ...trip }; // spread operator for shallow clone

    if (req.query.names) {
        const names = [];
        for (let participant_id of trip.participants) {
            let response = await Axios.get('http://localhost:3000/users/' + participant_id);
            let name = response.data.name;
            names.push(name);
        }
        result.participants = names;
    }
    delete result.meta; // clean up result object

    res.json(result);
}

router.get('/:id/shoes', getShoeCount);

async function getShoeCount(req, res) {
    let id = parseInt(req.params.id);
    const tripCollection = database.getCollection('trips');
    const trip = tripCollection.get(id);
    let shoeCount = 0;
    for (let participant_id of trip.participants) {
        let response = await Axios.get('http://localhost:3000/users/' + participant_id);
        let legs = response.data.legs;
        shoeCount += legs;
    }
    res.json({
        shoes: shoeCount,
    });
}

module.exports = router;


/*
let sub_object = { id: 17 }
let a = { key: 1, age: 3, name: "abc", subject: sub_object }

shallow: only make copy of 1st level
shallow_clone = { key: 1, age: 3, name: "abc", subject: sub_object } <<< references same sub_object
shallow_clone.subject.id = 13
a.subject == 13

deep clone: also makes clone of sub_object
deep_clone = { key: 1, age: 3, name: "abc", subject: copy_sub_object }
deep_clone.subject.id = 13
a.subject == 17
*/