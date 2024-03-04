//define as variáveis
var lua, title, bg1, how, play

//define a classe menu
class menu extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' })
    }
    preload() { //carrega previamente os arquivos
        this.load.image('lua','Semana_04/assets/Menu/lua.png');
        this.load.image('title', '../assets/Menu/title.png');
        this.load.image('bg', '../assets/Menu/bg.png')
        this.load.image('play', '../assets/Menu/play.png')
        this.load.image('how', '../assets/Menu/comoJogar.png')
    }

    create() { //adiciona os elementos na tela
        bg1 = this.add.image(400, 300, 'bg').setScale(1.2);
        lua = this.add.image(400, 300, 'lua').setScale(0.5);
        title = this.add.image(400, 300, 'title').setScale(0.5);
        play = this.add.image(200, 500, 'play').setScale(0.2);
        how = this.add.image(600, 500, 'how').setScale(0.2);
    
//deixa os botões interativos e responsivos

        play.setInteractive();
        play.on('pointerover', () => {
            play.setScale(0.23)
        });
        play.on('pointerout', () => {
            play.setScale(0.2)
        });
        play.on('pointerdown', () => {
            play.setScale(0.18);
            setTimeout(() => {
            this.scene.stop('menu')
            this.scene.start('level1')
            }, 300 );
        });
        play.on('pointerup', () => {
            play.setScale(0.2)
        })

        how.setInteractive();
        how.on('pointerover', () => {
            how.setScale(0.23)
        });
        how.on('pointerout', () => {
            how.setScale(0.2)
        });

        how.on('pointerdown', () =>{
            how.setScale(0.18);
            setTimeout(() => {
                this.scene.stop('menu');
                this.scene.start('como');
            }, 300)
        })
    }}
