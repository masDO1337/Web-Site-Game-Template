const Assets = [
    'assets/Player/player.png',
    'assets/City-background-layers/layer-1.png',
    'assets/City-background-layers/layer-2.png',
    'assets/City-background-layers/layer-3.png',
    'assets/City-background-layers/layer-4.png',
    'assets/City-background-layers/layer-5.png',
    'assets/Enemies/enemy_fly.png',
    'assets/Enemies/enemy_plant.png',
    'assets/Enemies/enemy_spider_big.png',
    'assets/fire.png',
    'assets/boom.png'
];

let Images = {};

for (let src of Assets) {
    let name = src.split('/')[src.split('/').length - 1].split('.')[0];
    const img = new Image();
    img.src = src;
    img.onload = function(){
        Images[name] = img;
    };
}