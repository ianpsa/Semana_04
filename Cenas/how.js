//define as variáveis
var lua, title, bg1, setas, space, setasText, spaceText, Howto, voltar

//define a classe como extensão das cenas
class como extends Phaser.Scene {
    constructor() {
        super({ key: 'como' })
    }
    preload() { //carrega previamente os arquivos
        this.load.image('lua','./assets/Menu/lua.png');
        this.load.image('title', './assets/Menu/title.png');
        this.load.image('bg', './assets/Menu/bg.png');
        this.load.image('setas','./assets/how/setas.png');
        this.load.image('space','./assets/how/space.png');
        this.load.image('voltar', './assets/how/voltar.png');
    }

    create() { //adiciona os elementos na tela
        bg1 = this.add.image(400, 300, 'bg').setScale(1.2);
        lua = this.add.image(150, 100, 'lua').setScale(0.2);
        title = this.add.image(150, 100, 'title').setScale(0.2);
        setas = this.add.image(200, 500, 'setas').setScale(0.2);
        space = this.add.image(600, 500, 'space').setScale(0.2);
        voltar = this.add.image(180, 680, 'voltar' ).setScale(0.2);

        Howto =  this.add.text(300, 150, 'Como jogar:', { fontSize: '50px', fill: '#ffffff' }).setDepth(3);

        setasText = this.add.text(100, 580, 'Utilize as teclas \n para se locomover', { fontSize: '20px', fill: '#ffffff' }).setDepth(3);
        spaceText = this.add.text(450, 580, 'Utilize a barra de espaço \n para lançar um feitiço', { fontSize: '20px', fill: '#ffffff' }).setDepth(3);
       
     //adiciona responsividade ao botão
        voltar.setInteractive();
        voltar.on('pointerover', () => {
            voltar.setScale(0.23)
        });
        voltar.on('pointerout', () => {
            voltar.setScale(0.2)
        });
        voltar.on('pointerdown', () => {
            voltar.setScale(0.18);
            setTimeout(() => {
            this.scene.stop('como')
            this.scene.start('menu')
            }, 300 );
        });
        voltar.on('pointerup', () => {
            voltar.setScale(0.2)
        })
    
    }}