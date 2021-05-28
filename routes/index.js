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

router.get('/plus', plus);

// .../plus?param1=17&param2=3
function plus(req, res) {
  const param1 = parseFloat(req.query.param1);
  const param2 = parseFloat(req.query.param2);
  const result = {
    result: param1 + param2,
    info: 'doppelt: _"_ '
  };
  res.json(result);
}
// {"result":20,"info":"doppelt: _\"_ "}


router.get('/sinus', sinus);

// .../sinus?param1=45
function sinus(req, res) {
  const param1_degree = parseFloat(req.query.param1);
  const param1_rad = param1_degree / 360 * 2 * Math.PI;
  const result = {
    result: Math.sin(param1_rad)
  };
  res.json(result);
}


router.get('/div', div);

function div(req, res) {
  const param1 = parseFloat(req.query.param1);
  const param2 = parseFloat(req.query.param2);
  const result = {
    result: param1 / param2
  };
  res.json(result);
}


module.exports = router;
