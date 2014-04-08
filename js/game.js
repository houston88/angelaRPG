var Game = require('crtrdg-gameloop');
var Keyboard = require('crtrdg-keyboard');
var io = require('socket.io-browserify');
var Player = require('./player');

var game = new Game({
    canvasId: 'game',
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#66CCFF'
});

var keyboard = new Keyboard(game);

// Create player
var player = new Player({
    position: { x: 10, y: 10 },
    size: { x: 40, y: 50 },
    velocity: { x: 0, y: 0 },
    speed: 3,
    friction: 0.9,
    color: '#fff'
});
// Add to game
player.addTo(game);

// update
player.on('update', function(interval) {
    player.update(interval, keyboard);
});

// draw
player.on('draw', function(draw) {
    player.draw(draw, keyboard);
});
