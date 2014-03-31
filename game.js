var inherits = require('inherits');
var Game = require('crtrdg-gameloop');
var Entity = require('crtrdg-entity');
var Keyboard = require('crtrdg-keyboard');

inherits(Player, Entity);

function Player(options){
    this.position = {
        x: options.position.x,
        y: options.position.y
    };

    this.size = {
        x: options.size.x,
        y: options.size.y
    };

    this.velocity = {
        x: options.velocity.x,
        y: options.velocity.y
    };

    this.speed = options.speed;
    this.friction = options.friction;
    this.color = options.color;
}

Player.prototype.move = function(velocity){
    this.position.x += velocity.x;
    this.position.y += velocity.y;
};

Player.prototype.checkBoundaries = function(){
    if (this.position.x <= 0){
        this.position.x = 0;
    }

    if (this.position.x >= this.game.width - this.size.x){
        this.position.x = this.game.width - this.size.x;
    }

    if (this.position.y <= 0){
        this.position.y = 0;
    }

    if (this.position.y >= this.game.height - this.size.y){
        this.position.y = this.game.height - this.size.y;
    }
};

Player.prototype.keyboardInput = function(){
    if ('A' in keyboard.keysDown){
        this.velocity.x = -this.speed;
    }

    if ('D' in keyboard.keysDown){
        this.velocity.x = this.speed;
    }

    if ('W' in keyboard.keysDown){
        this.velocity.y = -this.speed;
    }

    if ('S' in keyboard.keysDown){
        this.velocity.y = this.speed;
    }
};

var game = new Game({
    canvasId: 'game',
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#E187B8'
});

var keyboard = new Keyboard(game);

var player = new Player({
    position: { x: 10, y: 10 },
    size: { x: 40, y: 50 },
    velocity: { x: 0, y: 0 },
    speed: 3,
    friction: 0.9,
    color: '#fff'
});

player.addTo(game);

player.on('update', function(interval){
    this.keyboardInput(keyboard);

    this.move(this.velocity);
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;

    this.checkBoundaries();
});

// Lets load an image
var playerImageObj0 = new Image();
playerImageObj0.src = 'images/player/TestCharacter.png';
var playerImageObj1 = new Image();
playerImageObj1.src = 'images/player/TestCharacter1.png';
var animate = 50;

player.on('draw', function(draw){
    draw.fillStyle = this.color;
    //draw.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);

    // lets try an image? Cool! Lets animate it.
    if (animate >= 25) {
        draw.drawImage(playerImageObj0, this.position.x, this.position.y, this.size.x, this.size.y);
        animate = animate - 1;
    } else if (animate > 0 && animate <= 25) {
        draw.drawImage(playerImageObj1, this.position.x, this.position.y, this.size.x, this.size.y);
        animate = animate - 1;
    } else if (animate === 0) {
        draw.drawImage(playerImageObj1, this.position.x, this.position.y, this.size.x, this.size.y);
        animate = 50;
    }
});
