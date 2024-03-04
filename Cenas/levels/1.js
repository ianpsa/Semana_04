/* Definindo variáveis */
var lut, inimigo, cajado, placar, back, direct, space, particula, floor, Atirar, Pontos, gameOver;
var desarmado = true; Pontuacao = 0; vivo = true;
/* Definindo a classe */
class level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'level1' })
    }

    preload() {
        /*Pré-carregando Arquivos */
    inimigo = this.load.image('inimigo', '../assets/level/inimigo.png');
    this.load.image('floor', '../assets/level/grama.png');
    particula = this.load.image('particula','../assets/level/particula.png');
    this.load.image('bg1', '../assets/level/bg1.png');
    lut = this.load.spritesheet('lut','../assets/level/LutadorSpritesheet.png', {frameWidth:370, frameHeight:362, startFrame:0, endFrame:6});
    cajado = this.load.image('cajado', '../assets/level/cajado.png');
    console.log('preload feito');

    }

    create() {
//cria colisão entre lutador e inimigos
    this.physics.add.collider(lut, inimigo );


    /*Criando animações */

    this.anims.create ({
        key:'andar_d',
        frames: this.anims.generateFrameNumbers('lut', { start: 3, end: 5 }),
        frameRate: 10, 
        repeat: 0,
    });

    this.anims.create ({
        key:'andar_a',
        frames: this.anims.generateFrameNumbers('lut', { start: 0, end: 3}),
        frameRate:10,
        repeat: 0, 
    });

    /*Adicionando imagens e Sprites */

    lut = this.physics.add.sprite(300, 650, "lut").setScale(0.2).setDepth(4); //adiciona imagem do lutador ao canvas
    lut.setCollideWorldBounds(true);

    this.add.image(400 , 300, 'bg1').setScale(1.2).setDepth(1);
    this.add.image(400, 170, 'floor').setScale(0.6).setDepth(3);
    
    particula = this.physics.add.image(800, 600, 'particula').setScale(0.3).setDepth(2)
    particula.body.setSize(150, 150) //define o tamanho da bounding box da particula 
    particula.setCollideWorldBounds(true)

    cajado = this.physics.add.image(400, 700, 'cajado').setScale(0.07).setDepth(5)
    cajado.body.setSize(500, 500) //define o tamanho da bounding box do cajado
    cajado.setCollideWorldBounds(true);

    inimigo = this.physics.add.group({ //adiciona o grupo de inimigos
        key: 'inimigo',
        repeat: 25, // ajusta número de inimigos
        setXY: { x: 0, y: 50, stepX: 50 } //define distância entre inimigos e posição de inicio
    });

    inimigo.children.iterate(inimigo => { //define propriedades para cada inimigos (tamanho, bound box, e depth)
        inimigo.setScale(0.07);
        inimigo.body.setSize(400, 400);
        inimigo.setDepth(6);
    });

    this.physics.world.setBounds(0, 0, 800, 750); //define os limites do mundo

    /* Adicionando Inputs */
    direct = this.input.keyboard.createCursorKeys();
    space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.physics.add.overlap(lut, cajado, function(){ //verifica se os objetos estão sobrepostos e se sim executa a função
        cajado.destroy(); //faz a cajado desaparecer
        desarmado = false; //define variável como false
    });

    this.physics.add.overlap(particula, inimigo, kill, null, this); //quando inimigo estiver sobre particula chama a função kill

    Pontos = this.add.text(50, 50, 'Pontos: ' + Pontuacao, { fontSize: '32px', fill: '#ffffff' }).setDepth(8); //adiciona pontuação na tela

    /*adiciona tela de game over */
    gameOver = this.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#ffffff' });
    gameOver.setOrigin(0.5);
    gameOver.setVisible(false);

    let self = this; //define "this" para ser utilizavel dentro da função abaixo

    this.physics.add.overlap(lut, inimigo, function(){ //verifica se os objetos estão sobrepostos e se sim executa a função    
        


        var vivo = false //define variável vivo como false já que essa função é executada quando o inimigo esta tocando o player
        console.log('jogador está vivo? ' + vivo) //printa no console a mensagem com o valor da variável
        gameOver.setVisible(true).setDepth(7); //faz a tela de game over aparecer
        lut.disableBody(true).setVisible(false); //faz com que o lutador deixe de ser jogável e suma da tela

        setTimeout(() => { //define timout para voltar ao menu e parar a cena atual
            self.scene.stop('level1');
            self.scene.start('menu');

            Pontuacao = 0 //define pontuação para iniciar o game como zero

        }, 1000);
   })

}

    update() {
        
        /* direções para a esquerda com o teclado se armado ou desarmado */

        if (direct.left.isDown && desarmado == true) {
            lut.anims.play('andar_d', true).setFlip(false, false)
            lut.x -= 10
        } else if ( direct.left.isDown && desarmado == false ) {
            lut.anims.play('andar_a', true).setFlip(false, false)
            lut.x -= 10
        };

        /* direções para a direita com o teclado se armado ou desarmado */

        if ( direct.right.isDown && desarmado == true) {
            lut.anims.play('andar_d', true).setFlip(true, false);
            lut.x += 10
        } else if ( direct.right.isDown && desarmado == false) {
            lut.anims.play('andar_a', true).setFlip(true, false);
            lut.x += 10
        };

        if ( direct.up.isDown && lut.y >= 710 ) {
            lut.setVelocityY(-700);
        };

        /*Controle da particula */

        if ( space.isDown && desarmado == false) { //quando o player estiver com o cajado e a barra de espaço estiver pressionada
            
            console.log('is down')
            
            Atirar(); //chama a função que faz a particula mexer-se

        } else if (space.isUp) { //quando a barra de espaço não estiver pressionada
            
            console.log('is up')
            
            particula.setVisible(false) //particula fica invisivel
            /*posição do lutador e da particula são os mesmos*/
            particula.x = lut.x
            particula.y = lut.y
            
        }

        /*Comportamento ao eliminar todos os inimigos*/

        if(Pontuacao >= 26) {
            Pontuacao = 0
            this.scene.stop('level1');
            this.scene.start('menu');
        }

        /* movimentação dos inimigos em relação ao player */
        inimigo.getChildren().forEach(inimigo => { 
            const angulo = Phaser.Math.Angle.Between(inimigo.x, inimigo.y, lut.x, lut.y);
            const velocidade = new Phaser.Math.Vector2();
            velocidade.setToPolar(angulo, 100); // ajustar velocidade
            inimigo.setVelocity(velocidade.x, velocidade.y);
        
        });
        
    }
        }


/* Definindo as funções  */
   function Atirar(){
        particula.setVisible(true); // deixa a particula visivel
        particula.setVelocity(0, -800); //conforme a função for ativa define a velocidade da particula como 800 para cima
    };

    function kill(particula, inimigo) {
        Pontuacao += 1 //adiciona +1 na pontuação ao chamar a função
        inimigo.disableBody(true, true); //faz com que o inimigo deixe de estar na tela
        Pontos.setText('Pontos: ' + Pontuacao) //atualiza valor da pontuação na tela
        };