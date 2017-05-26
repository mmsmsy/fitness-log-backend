const express = require('express');
const router = express.Router();
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const monk = require('monk');
const db = require('monk')('localhost/fitness-log');
const users = db.get('users');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/v1', router);


router.get('/listusers', (req, res) => {
  users.find()
    .then(users => res.json(users))
});

router.get('/:nickname', (req, res) => {
  users.find({'nickname': req.params.nickname})
    .then(user => res.json(user))
});

router.get('/:nickname/:info', (req, res) => {
  users.find({'nickname': req.params.nickname}, `info.${req.params.info}`)
    .then(user => res.json(user))
});

router.post('/adduser', (req, res) => {
  users.insert(req.body, (err, result) => {
    res.send(
      (err === null) ? { msg: result } : { msg: err }
    );
  });
});

router.put('/addrecord/:nickname/:exercise', (req, res) => {
  const updateQuery = {$set: {}};
  updateQuery.$set[`exercises.${req.params.exercise}`] = req.body;
  users.update({'nickname': req.params.nickname}, updateQuery, (err, result) => { 
    res.send(
      (err === null) ? { msg: result } : { msg: err }
    );
  });
});

router.delete('/deleteuser/:nickname', (req, res) => {
  users.remove({ 'nickname': req.params.nickname }, err => {
    res.send((err === null) ? { msg: '' } : { msg: 'error: ' + err});
  });
});

router.delete('/deleteallusers', (req, res) => {
  users.remove({}, err => {
    res.send(err === null) ? {msg: '' } : { msg: 'error: ' + err};
  });
});

app.listen(3001, () => console.log("Server running at 3001"));