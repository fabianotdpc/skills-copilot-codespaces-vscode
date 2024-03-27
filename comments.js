// Create web server for comments
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/comments.html');
});

var comments = [];
app.get('/comments', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(comments));
});

app.post('/comments', function(req, res) {
    var comment = req.body;
    comments.push(comment);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(comment));
});

app.listen(3000);
console.log('Server is running on port 3000');
```

- Run the server

```bash
$ node comments.js
```

- Open http://localhost:3000/ in your browser
- Open Developer Tools and go to Console
- Try to add some comments and see the result in the Console

## REST API

- Create a simple REST API for comments
- Use `express.Router` to modularize the code

```javascript
// Path: comments.js
// Create web server for comments
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/comments', require('./commentsRouter'));

app.listen(3000);
console.log('Server is running on port 3000');
```

```javascript
// Path: commentsRouter.js
var express = require('express');
var router = express.Router();

var comments = [];

router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(comments));
});

router.post('/', function(req, res) {
    var comment = req.body;
    comments.push(comment);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(comment));
});

module.exports = router;
```

- Run the server

```bash
$ node comments.js
```

- Open http://localhost:3000/comments in your browser
- Open Developer Tools and go to Console
- Try to add some comments and see the result in the Console

## Middleware

- Create a middleware to log the requests

```javascript
// Path: comments.js
// Create web server for comments
var express = require('express');
var bodyParser =
