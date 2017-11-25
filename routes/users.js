const express = require('express');
const db = require('../src/database');

const router = express.Router();

router.get('/', getAllUsers);

function getAllUsers(request, response){
    response.json([1,2,3]);
}

module.exports = router;