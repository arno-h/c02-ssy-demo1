// required
const express = require('express');
// required to access the database
const db = require('../src/database');

// starts the router connection
const router = express.Router();

// adds a new entrypoint to listen
router.get('/', getAllUsers);

// create function called getAllUsers, take request as input
function getAllUsers(request, response){
    // get a Collection of all Users from the Table.
    // similiar to "select * from users"
    let userColletion = db.getCollection('users');
    // transfer the collection to a object
    let userObjects = userColletion.find();
    // give the response back
    response.json(userObjects);
}

// add a new route : is used for parameters, and then call the following function
// router.[get,delete,put,post,patch] here are all the standard HTTP Methods available
// HTTP Methods ==> https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods
router.get('/:userId', getSingleUser);

// create function called getSingleUser, take request as input
function getSingleUser (request, response){
    // similiar to function getAllUsers
    let userId = request.params.userId;
    let userColletion = db.getCollection('users');

    // pay attention here. if you use ".get('userId')"" it will be parsed as a string and therefore an error
    // like "Passed userId is not an integer" will occur
    let userObject = userColletion.get(userId);

    response.json(userObject);
}

// add a new route for delete
router.delete('/:userId', deleteSingleUser);

function deleteSingleUser(request, response){
    let userId = request.params.userId;
    let userColletion = db.getCollection('users');
    let userObject = userColletion.get(userId);
    userColletion.remove(userObject);

    response.json(true);
}
// need to export the router
module.exports = router;