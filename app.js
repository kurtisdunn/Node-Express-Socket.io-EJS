'use strict';

/*
 * Express Dependencies
 */
var express = require('express')
  , app = express()
	, cons = require('consolidate')
	, ejs = require('ejs')
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var port = 3000;

/*
 * Use Handlebars for templating
 */


// For gzip compression
app.use(express.compress());

/*
 * Config for Production and Development
 */
if (process.env.NODE_ENV === 'production') {
    // Set the default layout and locate layouts and partials
		app.engine('ejs', cons.ejs);

		app.set('views', __dirname + '/app/views');

    // Locate the views
		app.use(express.static(__dirname + '/app/assets'));

} else {
	app.engine('html', cons.ejs);

	app.set('views', __dirname + '/app/views');

  // Locate the views
	app.use(express.static(__dirname + '/app/assets'));
}

// Set Handlebars
app.set('view engine', 'ejs');


/*
 * Routes
 */


// Index Page
app.get('/', function(request, response, next) {
	response.render('index', {
		title: 'Node Express Socket.io RequreJS Bootstrap',
	});
});


// Socket
io.on('connection', function (socket) {
  socket.emit('message', { hello: 'Socket Connected.' });
  socket.on('send', function (data) {
    io.emit('message', data);
  });
});


/*
 * Start it up
 */
server.listen(port);
console.log('Express started on port ' + port);

exports = module.exports = server;

exports.use = function() {
	app.use.apply(app, arguments);
};
