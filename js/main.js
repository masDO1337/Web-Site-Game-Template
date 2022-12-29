import { InputHandler } from './input.js';
import { Background } from './background.js';
import { UI } from './UI.js';
import { Player } from './player.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemies.js';

window.addEventListener('load', function(){
    const ctx = MainCanvas.getContext('2d');
    MainCanvas.width = 900;
    MainCanvas.height = 500;

    class Game {
        constructor(){
            this.width = MainCanvas.width;
            this.height = MainCanvas.height;
            this.groundMargin = 80;
            this.speed = 0;
            this.maxSpeed = 3;
            this.input = new InputHandler(this);
            this.background = new Background(this);
            this.UI = new UI(this);
            this.player = new Player(this);
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 5000;
            this.particles = [];
            this.maxParticles = 200;
            this.collisions = [];
            this.score = 0;
            this.fontColor = 'black';
            this.time = 0;
            this.maxTime = 20000;
            this.gameOver = false;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.debug = true;
        }
        update(deltaTime){
            this.time += deltaTime;
            if (this.time > this.maxTime) this.gameOver = true;
            this.player.update(this.input.keys, deltaTime);
            this.background.update();

            if (this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            }
            else this.enemyTimer += deltaTime;

            this.enemies.forEach((enemy, index) => {
                enemy.update(deltaTime)
                if (enemy.markedForDeletion) this.enemies.splice(index, 1);
            });

            this.particles.forEach((particle, index) => {
                particle.update(deltaTime)
                if (particle.markedForDeletion) this.particles.splice(index, 1);
            });

            if (this.particles.length > this.maxParticles) this.particles.length = this.maxParticles;

            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime)
                if (collision.markedForDeletion) this.collisions.splice(index, 1);
            });
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => enemy.draw(context));
            this.particles.forEach(particle => particle.draw(context));
            this.collisions.forEach(collision => collision.draw(context));
            this.UI.draw(context);
        }
        addEnemy(){
            if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
    }

    const game = new Game();

    let lastTime = 0

    function Loop(timeTemp){
        const deltaTime = timeTemp - lastTime;
        lastTime = timeTemp;
        ctx.clearRect(0, 0, MainCanvas.width, MainCanvas.height)
        game.update(deltaTime);
        game.draw(ctx);
        if(!game.gameOver) requestAnimationFrame(Loop);
    }
    Loop(0);
});