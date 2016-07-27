var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database

mongoose.connect('mongodb://test:test@ds031995.mlab.com:31995/nntodo');

var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

	app.get('/todo', function(req, res){
		res.render('todo', {todos: data});
	});

	app.post('/todo', urlencodedParser, function(req, res){
		data.push(req.body);
		res.json(data);
	});

	app.delete('/todo/:item', function(req, res){
		data = data.filter(function(todo){
			return todo.item.replace(/ /g, '-') !== req.params.item;
		});
		res.json(data);
	});
};