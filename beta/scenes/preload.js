export class Preload extends Phaser.Scene {
    constructor() {
        super("preload");
    }

    preload() {
        //Map Tiled
        this.load.image("tileset_Test", "../maps/tileset_test.png");
        this.load.image("tileset_PlaceHolder", "../maps/tileset_placeHolder.png");
        this.load.tilemapTiledJSON("sceneTest", "../assets/json/sceneTest.json");
        this.load.tilemapTiledJSON("etang", "../assets/json/etang.json");
        this.load.tilemapTiledJSON("marais", "../assets/json/marais.json");
        this.load.tilemapTiledJSON("grotte", "../assets/json/grotte.json");

        //SpriteSheet
        this.load.spritesheet('perso', '../assets/spritesheet/persoSS.png',
            { frameWidth: 128, frameHeight: 256 });
        this.load.spritesheet('tongEnd', '../assets/spritesheet/tong.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.image("tong", "../assets/spritesheet/tongL.png");

        //Hat
        this.load.spritesheet('hatGrab', '../assets/spritesheet/hatGrab.png',
            { frameWidth: 22, frameHeight: 21 });
        this.load.spritesheet('hatGrow', '../assets/spritesheet/hatGrow.png',
            { frameWidth: 22, frameHeight: 21 });
        this.load.spritesheet('hatFire', '../assets/spritesheet/hatFire.png',
            { frameWidth: 22, frameHeight: 21 });

        //UI
        this.load.spritesheet('cadreHat', '../assets/spritesheet/cadrehat.png',
            { frameWidth: 49, frameHeight: 48 });
        this.load.spritesheet('healthBar', '../assets/spritesheet/healthBarSS.png',
            { frameWidth: 320, frameHeight: 64 });

        //Mob
        this.load.spritesheet('mobGuepe', '../assets/spritesheet/guepeSS.png',
            { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('mobSpider', '../assets/spritesheet/spiderSS.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('mobSangsue', '../assets/spritesheet/sangsueSS.png',
            { frameWidth: 64, frameHeight: 160 });

        this.load.spritesheet('moustique', '../assets/spritesheet/moustique.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('escargot', '../assets/spritesheet/escargotSS.png',
            { frameWidth: 192, frameHeight: 64 });

        //Texture Obstacle
        this.load.image("plantGrab", "../assets/planteGrab.png");
        this.load.image("breakFire", "../assets/breakFire.png");
        this.load.image("breakFire12", "../assets/breakFire12.png");
        this.load.image("breakFire10", "../assets/breakFire10.png");
        this.load.image("breakFire5", "../assets/breakFire5.png");
        this.load.image("berry", "../assets/berry.png");
        this.load.image("ronces", "../assets/ronces.png");

        //Texture Proj
        this.load.spritesheet("fire", "../assets/fire.png",
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("berryShoot", "../assets/berry.png",
            { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet("spiderProj", "../assets/spiderShoot.png",
            { frameWidth: 32, frameHeight: 32 });

        //Image
        this.load.image('logoMainScreen', "../assets/logoMainScreen.png");
        this.load.image('launchGame', "../assets/launchGame.png");
        this.load.image("mainScreenIMG", "../assets/MainScreen.png");
        this.load.image("gameOverIMG", "../assets/GameOverScreen.png");
        this.load.image("gameWinIMG", "../assets/VictoryScreen.png");

        this.load.image('bgEtang', '../assets/backgroungEtang.png');
        this.load.image('bgMarais', '../assets/backgroungMarais.png');
        this.load.image('bgGrotte', '../assets/backgroungGrotte.png');

        //DevIMG
        this.load.image('waterCheckIMG', '../assets/waterCheck.png');
        this.load.image('waterCheckLittleIMG', '../assets/waterCheckLittle.png');
        this.load.image('Travel5', '../assets/Travel5.png');
        this.load.image('Travel8', '../assets/Travel8.png');
    }

    create() {
        //Animation Joueur// BETA
        {
            this.anims.create({
                key: 'turn',
                frames: [{ key: 'perso', frame: 0 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'left',
                frames: [{ key: 'perso', frame: 1 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'right',
                frames: [{ key: 'perso', frame: 2 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'chargeJump',
                frames: [{ key: 'perso', frame: 3 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'crounch',
                frames: [{ key: 'perso', frame: 4 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'crounchLeft',
                frames: [{ key: 'perso', frame: 5 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'crounchRight',
                frames: [{ key: 'perso', frame: 6 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'shootingStand',
                frames: [{ key: 'perso', frame: 7 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'shootingCrounch',
                frames: [{ key: 'perso', frame: 8 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'swim',
                frames: [{ key: 'perso', frame: 9 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'standby_grab',
                frames: [{ key: 'perso', frame: 10 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'left_grab',
                frames: [{ key: 'perso', frame: 11 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'right_grab',
                frames: [{ key: 'perso', frame: 12 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'climb_grab',
                frames: [{ key: 'perso', frame: 13 }],
                frameRate: 20
            });

        }

        //Animation Joueur
        this.anims.create({
            key: 'player_standBy',
            frames: this.anims.generateFrameNumbers('perso', {start:20,end:21}),
            frameRate: 2,
            repeat : -1
        });

        this.anims.create({
            key: 'player_walk',
            frames: this.anims.generateFrameNumbers('perso', {start:22,end:23}),
            frameRate: 2,
            repeat : -1
        });

        this.anims.create({
            key: 'player_chargeJump',
            frames: this.anims.generateFrameNumbers('perso', {start:24,end:24}),
            frameRate: 2,
            repeat : -1
        });

        this.anims.create({
            key: 'player_shift',
            frames: this.anims.generateFrameNumbers('perso', {start:25,end:25}),
            frameRate: 2,
            repeat : -1
        });
        
        this.anims.create({
            key: 'player_shift_walk',
            frames: this.anims.generateFrameNumbers('perso', {start:27,end:28}),
            frameRate: 2,
            repeat : -1
        });

        this.anims.create({
            key: 'player_shoot',
            frames: this.anims.generateFrameNumbers('perso', {start:30,end:30}),
            frameRate: 2,
            repeat : -1
        });

        this.anims.create({
            key: 'player_shift_shoot',
            frames: this.anims.generateFrameNumbers('perso', {start:31,end:31}),
            frameRate: 2,
            repeat : -1
        });

        this.anims.create({
            key: 'player_swim',
            frames: this.anims.generateFrameNumbers('perso', {start:32,end:33}),
            frameRate: 2,
            repeat : -1
        });

        this.anims.create({
            key: 'player_grab',
            frames: this.anims.generateFrameNumbers('perso', {start:34,end:35}),
            frameRate: 2,
            repeat : -1
        });




        //Animation Proj
        //Tong
        this.anims.create({
            key: 'tongProj',
            frames: [{ key: 'tongEnd', frame: 0 }],
            frameRate: 20
        });
        //Berry
        this.anims.create({
            key: 'berryProj',
            frames: [{ key: 'berryShoot', frame: 0 }],
            frameRate: 20
        });

        //Fire
        this.anims.create({
            key: 'fireProj',
            frames: [{ key: 'fire', frame: 0 }],
            frameRate: 20
        });

        //Spider Proj
        this.anims.create({
            key: 'spiderShoot',
            frames: [{ key: 'spiderProj', frame: 0 }],
            frameRate: 20
        });

        //Animation Mob//
        {
            //Guepe
            this.anims.create({
                key: 'guepe_passif',
                frames: this.anims.generateFrameNumbers('mobGuepe', {start:0,end:1}),
                frameRate: 5,
                repeat : -1
            });
            this.anims.create({
                key: 'guepe_agro',
                frames: this.anims.generateFrameNumbers('mobGuepe', {start:2,end:3}),
                frameRate: 5,
                repeat : -1
            });

            //Spider
            this.anims.create({
                key: 'spider_base',
                frames: [{ key: 'mobSpider', frame: 0 }],
                frameRate: 20
            });

            //Sangsue
            this.anims.create({
                key: 'sangsue_base',
                frames: this.anims.generateFrameNumbers('mobSangsue', {start:0,end:10}),
                frameRate: 5,
                repeat : -1
            });

            //Moustique
            this.anims.create({
                key: 'moustique_mouv',
                frames: this.anims.generateFrameNumbers('moustique', {start:0,end:6}),
                frameRate: 5,
                repeat : -1
            });

            //Escargot
            this.anims.create({
                key: 'escargot_mouv',
                frames: this.anims.generateFrameNumbers('escargot', {start:0,end:8}),
                frameRate: 2,
                repeat : -1
            });

        }

        //Animation UI//
        //Cadre Hat
        {
            this.anims.create({
                key: 'empty',
                frames: [{ key: 'cadreHat', frame: 0 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'grab',
                frames: [{ key: 'cadreHat', frame: 1 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'grow',
                frames: [{ key: 'cadreHat', frame: 2 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'fire',
                frames: [{ key: 'cadreHat', frame: 3 }],
                frameRate: 20
            });
        }
        //Barre de vie
        {
            this.anims.create({
                key: '0',
                frames: [{ key: 'healthBar', frame: 0 }],
                frameRate: 20
            });
            this.anims.create({
                key: '1',
                frames: [{ key: 'healthBar', frame: 1 }],
                frameRate: 20
            });
            this.anims.create({
                key: '2',
                frames: [{ key: 'healthBar', frame: 2 }],
                frameRate: 20
            });
            this.anims.create({
                key: '3',
                frames: [{ key: 'healthBar', frame: 3 }],
                frameRate: 20
            });
            this.anims.create({
                key: '4',
                frames: [{ key: 'healthBar', frame: 4 }],
                frameRate: 20
            });
            this.anims.create({
                key: '5',
                frames: [{ key: 'healthBar', frame: 5 }],
                frameRate: 20
            });
        }
    }

    update() {
        this.scene.start("mainScreen");
    }
}