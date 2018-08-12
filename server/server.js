const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose.js');
var {Vocab} = require('./models/vocab');

var app = express();
const port = process.env.PORT || 3005;

app.use(bodyParser.json());


//POST vocab
app.post('/vocabs', (req, res) => {
  var vocab = new Vocab({
    name: req.body.name,
    definition: req.body.definition
  });

  vocab.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


//GET all vocabs
app.get('/vocabs', (req, res) => {
  Vocab.find().then((vocabs) => {
    res.send({vocabs});
  }, (e) => {
    res.status(400).send(e);
  });
});


//GET vocab by :id
app.get('/vocabs/:id', (req, res) => {
  var id = req.params.id;
  //validate ObjectID
  if (!ObjectID.isValid(id)) {
    return res.status(404).send('Please use a valid id');
  }

  Vocab.findById(id).then((doc) => {
    if (!doc) {
      return res.status(404).send('No vocab matching with the id');
    }
    res.send(doc);
  }).catch((e) => {
    res.status(404).send('Unable to fetch data');
  });
});


//DELTE by :id
app.delete('/vocabs/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send('Please use a valid object id');
  }
  Vocab.findByIdAndRemove(id).then((doc) => {
    if (!doc) {
      return res.status(404).send('No object found with the id');
    }
    return res.status(200).send(doc)
  }).catch((e) => {
    res.status(400).send();
  });
});


//PATCH /vocabs/:id
app.patch('/vocabs/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['name', 'definition']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('Please use a valid object id');
  }
  Vocab.findByIdAndUpdate(id, {$set: body}, {new: true}).then((doc) => {
    if(!doc) {
      return res.status(404).send('No doc found with the id');
    }
    res.send({doc})
  }).catch((e) => {
    res.status(400).send();
  });
});



app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
