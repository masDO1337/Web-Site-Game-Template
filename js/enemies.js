class Enemy {
    constructor(game){
        this.game = game;
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }
    update(deltaTime){
        this.x -= this.vx + this.game.speed;
        this.y += this.vy;

        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX ++;
            else this.frameX = 0;
        }
        else this.frameTimer += deltaTime;

        if(this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game){
        super(game);
        this.image = Images['enemy_fly']
        this.width = this.image.width/6;
        this.height = this.image.height;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.vx = Math.random() + 1;
        this.vy = 0;
        this.maxFrame = 5;
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime){
        super.update(deltaTime);
        this.angle += this.va;
        this.vy = Math.sin(this.angle);
    }
}

export class GroundEnemy extends Enemy {
    constructor(game){
        super(game);
        this.image = Images['enemy_plant']
        this.width = this.image.width/2;
        this.height = this.image.height;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vx = 0;
        this.vy = 0;
        this.maxFrame = 1;
    }
}

export class ClimbingEnemy extends Enemy {
    constructor(game){
        super(game);
        this.image = Images['enemy_spider_big']
        this.width = this.image.width/6;
        this.height = this.image.height;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.vx = 0;
        this.vy = Math.random() > 0.5 ? 1 : -1;
        this.maxFrame = 5;
    }
    update(deltaTime){
        super.update(deltaTime);
        if (this.y > this.game.height - this.height - this.game.groundMargin) this.vy *= -1;
        if (this.y < -this.height) this.markedForDeletion = true;
    }
    draw(context){
        super.draw(context);
        context.beginPath();
        context.moveTo(this.x + (this.width/2), 0);
        context.lineTo(this.x + (this.width/2), this.y + 50)
        context.stroke();
    }
}