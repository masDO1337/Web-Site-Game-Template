class Particle {
    constructor(game){
        this.game = game;
        this.markedForDeletion = false;
    }
    update(deltaTime){
        this.x -= this.vx + this.game.speed;
        this.y += this.vy;
        this.size *= 0.98;

        if(this.size < 0.5) this.markedForDeletion = true;
    }
}

export class Dust extends Particle {
    constructor(game, x, y){
        super(game);
        this.size = Math.random() * 10 + 10;
        this.x = x;
        this.y = y;
        this.vx = Math.random();
        this.vy = Math.random();
        this.color = 'rgba(0,0,0,0.2)';
    }

    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.fillStyle = this.color;
        context.fill();
    }
}

export class Splash extends Particle {
    constructor(game, x, y){
        super(game);
        this.image = Images['fire'];
        this.size = Math.random() * 100 + 100;
        this.x = x - this.size * 0.4;
        this.y = y - this.size * 0.5;
        this.vx = Math.random() * 6 - 4;
        this.vy = Math.random() * 2 + 1;
        this.graviy = 0;
    }
    update(deltaTime){
        super.update(deltaTime);
        this.graviy += 0.1;
        this.y += this.graviy;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
}

export class Fire extends Particle {
    constructor(game, x, y){
        super(game);
        this.image = Images['fire'];
        this.size = Math.random() * 100 + 50;
        this.x = x;
        this.y = y;
        this.vx = 1;
        this.vy = 1;
        this.angle = 0;
        this.va = Math.random() * 0.2 - 0.1;
    }
    update(deltaTime){
        super.update(deltaTime);
        this.angle += this.va;
        this.x += Math.sin(this.angle * 5);
    }
    draw(context){
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(this.image, -this.size/2, -this.size/2, this.size, this.size);
        context.restore();
    }
}