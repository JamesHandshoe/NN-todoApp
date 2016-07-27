var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database

mongoose.connect('mongodb://test:test@ds031995.mlab.com:31995/nntodo');

// create a schema - this is like a blueprint for data

var todoSchema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

	app.get('/todo', function(req, res){
		//get data from mongodb and pass it to the view
		Todo.find({}, function(err, data){
			if (err) throw err;
			res.render('todo', {todos: data});
		});
		
	});

	app.post('/todo', urlencodedParser, function(req, res){
		//get data from view and add it to mongodb
		var newTodo = Todo(req.body).save(function(err, data){
			if (err) throw err;
			res.json(data);
		});
	});

	app.delete('/todo/:item', function(req, res){
		//delete the requested item from mongodb
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
			if (err) throw err;
			res.json(data);
		});
		
	});
};