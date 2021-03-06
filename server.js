var PORT = process.env.PORT || 8000;
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


app.get('/', function(req, res) {
    if(!req.body) {
        return res.sendStatus(400);
    }
})

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

app.put('/items/:id', jsonParser, function(req, res) {
    if(!req.body) {
        return res.sendStatus(400);
    }
   
    storage.items[req.params.id].name=req.body.name;
    res.status(200).json(storage.items[req.params.id]);
});

app.delete('/items/:id', jsonParser, function(req, res) {
	if(!req.body) {
		return res.sendStatus(400);
	}
	var item = storage.items.splice(req.params.id, 1);
	res.status(200).json(item);
});

exports.app = app;
exports.storage = storage;

if ( require.main === module ) {
    app.listen(PORT, function(){
        console.log("Server running on port:" + PORT);
    });
}



