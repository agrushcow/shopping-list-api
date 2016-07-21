var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');
storage.add('Olives');

var app = express();
app.use(express.static('public'));

app.get('/items', function(req, res) {
    res.json(storage.items);
});

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = storage.add(req.body.name);
    res.status(201).json(item);
});

app.delete('/items/:id', function(req, res) {
	var item = storage.remove(req.body.name);
	if(item) {
		res.status(201).json(item);
	} else {
		res.status(400).json({
			"error": "no item was found"
		});
	}
});

app.put('/items/:id', function(req, res) {
	if(!req.body) {
		return res.sendStatus(400);
	}
	var item = storage.put(req.body.name);
	res.status(201).json(item);
});

app.listen(process.env.PORT || 8080);