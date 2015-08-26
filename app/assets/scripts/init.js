require.config({
	paths: {
		text: '/vendor/requirejs-text/text.js',
		jquery: '/vendor/jquery/jquery.min',
		underscore: '/vendor/underscore/underscore-min',
		backbone: '/vendor/backbone/backbone-min',
		bootstrap: '/vendor/bootstrap/dist/js/bootstrap.min',
		socketio: '/vendor/socket.io-client/socket.io',
		templates: '/templates'
	},
	wrapShim: true,
	shim: {
		jquery: {
			exports: '$, jQuery'
		},
		underscore: {
			exports: '_'
		},
		backbone: {
			exports: 'Backbone',
			deps: ['jquery', 'underscore']
		},
		bootstrap: {
			exports: 'Bootstrap',
			deps: ['jquery']
		},
		socketio: {
			exports: 'io'
		}
	}
});
define(['jquery', 'underscore', 'backbone', 'bootstrap', 'socketio'],
	function($, _, Backbone, Bootstrap, io) {
		$ = $.noConflict(true);
		_ = _.noConflict();
		Backbone = Backbone.noConflict();
		if (!window.$ && !window.jQuery) {
			window.$ = window.jQuery = $;
		}
		if (!window._) {
			window._ = _;
		}
		if (!window.io) {
			window.io = io;
		}
		if (!window.Backbone) {
			window.Backbone = Backbone;
		}
		var messages = [];
		var socket = io.connect('http://localhost:3000');

		socket.emit('requestName');
		socket.on('message', function(data) {
			addAlert(data);
		});

		function addAlert(message) {
			console.log(message)
			$('.starter-template').prepend(
				'<div class="alert alert-success" role="alert">' +
				'<button type="button" class="close" data-dismiss="alert">' +
				'&times;</button>' + message.hello + ' & Modules Loaded</div>').hide().fadeIn();
		}


		return {
			$: $,
			_: _,
			Backbone: Backbone,
			Bootstrap: Bootstrap
		};
	}
);
