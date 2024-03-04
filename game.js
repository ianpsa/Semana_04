const config = { //configurações do game
    type: Phaser.AUTO,
/*define tamanho do canvas */
    width: 800,
    heigh: 600,

    physics: { //define a gravidade, modo de jogo e modo debug
        default: 'arcade',
        arcade: {
            gravity: { y: 1200 }, //define a gravidade do jogo
            debug: true //define se as ferramentas de desenvolvedor são ativadas
        }
    },

    scene: [ menu, como, level1], //adiciona as cenas
}

const game = new Phaser.Game(config); //adiciona as configurações definidas à variável game