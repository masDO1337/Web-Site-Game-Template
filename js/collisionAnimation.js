export class CollisionAnimation {
    constructor(game, x, y){
        this.game = game;
        this.image = Images['boom'];
        this.spriteWidth = this.image.width/5;
        this.spriteHeight = this.image.height;
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width/2;
        this.y = y - this.height/2;
        this.vx = 0;
        this.vy = 0;
        this.frameX = 0;
        this.fps = 15;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
        this.maxFrame = 4
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

        if(this.frameX >= this.maxFrame) this.markedForDeletion = true;
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}