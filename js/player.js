import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit } from "./playerStates.js";
import { CollisionAnimation } from "./collisionAnimation.js";

export class Player {
    constructor(game){
        this.game = game;
        this.image = Images['player'];
        this.width = this.image.width / 12;
        this.height = this.image.height / 10;
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.weight = 1;
        this.maxSpeed = 10;
        this.states = [
            new Sitting(this.game),
            new Running(this.game),
            new Jumping(this.game),
            new Falling(this.game),
            new Rolling(this.game),
            new Diving(this.game),
            new Hit(game)
        ];
    }
    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        
        this.x += this.vx;
        if (input.includes('d') && this.currentState !== this.states[6]) {
            this.vx = this.maxSpeed;
        }
        else if (input.includes('a') && this.currentState !== this.states[6]){
            this.vx = -this.maxSpeed;
        }
        else this.vx = 0;

        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0

        if (this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin;

        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX ++;
            else this.frameX = 0;
        }
        else this.frameTimer += deltaTime;
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
    }
    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
    checkCollision(){
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ){
                enemy.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width/2, enemy.y + enemy.height/2));
                if (
                    this.currentState === this.states[4] ||
                    this.currentState === this.states[5]
                ) this.game.score ++;
                else this.setState(6, 0)
            }
        });
    }
}