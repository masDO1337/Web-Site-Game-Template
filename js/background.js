class Layer {
    constructor(game, image, speedModifier) {
        this.game = game;
        this.image = image;
        this.width = this.image.width;
        this.height = this.image.height;
        this.speedModifier = speedModifier;
        this.x = 0;
        this.y = 0;
    }
    update(){
        if (this.x < -this.width) this.x = 0;
        else this.x -= this.game.speed * this.speedModifier;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.width = 1667;
        this.height = 500;
        this.backgroundLayers = [
            new Layer(this.game, Images['layer-1'], 0),
            new Layer(this.game, Images['layer-2'], 0.2),
            new Layer(this.game, Images['layer-3'], 0.4),
            new Layer(this.game, Images['layer-4'], 0.8),
            new Layer(this.game, Images['layer-5'], 1)
        ];
    }
    update(){
        this.backgroundLayers.forEach(layer => {
            layer.update();
        });
    }
    draw(context){
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        });
    }
}