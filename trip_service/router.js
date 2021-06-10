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

module.exports = router;


/*
let sub_object = { id: 17 }
let a = { key: 1, age: 3, name: "abc", subject: sub_object }

shallow: nur auf 1. Ebene
shallow_clone = { key: 1, age: 3, name: "abc", subject: sub_object } <<< references same sub_object
shallow_clone.subject.id = 13
a.sub_object == 13

deep clone: also makes clone of sub_object
deep_clone = { key: 1, age: 3, name: "abc", subject: copy_sub_object }
deep_clone.subject.id = 13
a.sub_object == 17
*/