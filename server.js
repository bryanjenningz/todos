var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

var todos = JSON.parse(fs.readFileSync('todos.json').toString());

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

function save(todos) {
  fs.writeFileSync('todos.json', JSON.stringify(todos));
}

app.get('/api/todos', function(req, res) {
  res.status(200);
  res.json(todos);
});

app.post('/api/todos', function(req, res) {
  todos.push(req.body.todo);
  save(todos);
  res.status(201);
  res.json(todos);
});

app.delete('/api/todos/:index', function(req, res) {
  var index = Number(req.params.index);
  if (isNaN(index)) {
    res.status(404);
    res.json('Send a valid index. You sent: ' + req.params.index);
  } else {
    todos.splice(index, 1);
    save(todos);
    res.status(204);
    res.json(null);
  }
});

app.listen(3000, () => console.log('Listening on port 3000'));
