/**
 * Created by hharris3 on 4/8/14.
 */
var Entity = require('crtrdg-entity');
var inherits = require('inherits');

module.exports = Player;
inherits(Player, Entity);

function Player(options) {
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

    // Lets load an image
    this.playerImageObj0 = new Image();
    this.playerImageObj0.src = 'images/player/TestCharacter.png';
    this.playerImageObj1 = new Image();
    this.playerImageObj1.src = 'images/player/TestCharacter1.png';

    // How often to we animate? Need a better way to do this!
    this.animate = 50;

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

Player.prototype.keyboardInput = function(keyboard){
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

Player.prototype.update = function(interval, keyboard) {
    this.keyboardInput(keyboard);
    this.move(this.velocity);
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.checkBoundaries();
}

Player.prototype.draw = function(draw, keyboard) {
    draw.fillStyle = this.color;
    //draw.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    if (Object.keys(keyboard.keysDown).length > 0)  {
        this.walk(draw);
    } else {
        draw.drawImage(this.playerImageObj0, this.position.x, this.position.y, this.size.x, this.size.y);
    }
    draw.fillText('The Player', this.position.x, this.position.y+60);
}

// TODO: Get animation working again
Player.prototype.walk = function(draw) {
    if (this.animate >= 25) {
        draw.drawImage(this.playerImageObj0, this.position.x, this.position.y, this.size.x, this.size.y);
        this.animate--;
    } else if (this.animate > 0 && this.animate <= 25) {
        draw.drawImage(this.playerImageObj1, this.position.x, this.position.y, this.size.x, this.size.y);
        this.animate--;
    } else if (this.animate === 0) {
        draw.drawImage(this.playerImageObj1, this.position.x, this.position.y, this.size.x, this.size.y);
        this.animate = 50;
    }

}