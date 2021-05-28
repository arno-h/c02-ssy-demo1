const express = require('express');
const router = express.Router();

router.get('/', hello);

function hello(req, res) {
  res.send('NodeJS + Express läuft rund & schnell!!');
}

router.get('/schoko', schoko);

// http://localhost:3000/schoko
// http://localhost:3000/schoko/milch
// http://localhost:3000/schoko?art=milch

function schoko(request, response) {
  const schoko_art = request.query.art;
  response.send(schoko_art + "schokolade");
}

module.exports = router;
