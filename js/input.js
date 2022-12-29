export class InputHandler {
    constructor(game){
        this.game = game;
        this.keys = [];
        window.addEventListener('keydown', e => {
            if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
            if (e.key == 'p') this.game.debug = !this.game.debug;
        });
        window.addEventListener('keyup', e => {
            this.keys.splice(this.keys.indexOf(e.key), 1);
        });

    }
}