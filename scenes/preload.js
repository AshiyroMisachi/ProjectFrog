export class Preload extends Phaser.Scene {
    constructor() {
        super("preload");
    }

    preload() {
        //Map Tiled
        this.load.image("tileset_Test", "../maps/tileset_test.png");
        this.load.tilemapTiledJSON("sceneTest", "../assets/json/sceneTest.json");

        //SpriteSheet
        this.load.spritesheet('perso', '../assets/spritesheet/persoSS.png',
            { frameWidth: 128, frameHeight: 256 });
        this.load.spritesheet('tongEnd', '../assets/spritesheet/tong.png',
            { frameWidth: 32, frameHeight: 32 });

        //Hat
        this.load.spritesheet('hatGrab', '../assets/spritesheet/hatGrab.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('hatGrow', '../assets/spritesheet/hatGrow.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('hatFire', '../assets/spritesheet/hatFire.png',
            { frameWidth: 32, frameHeight: 32 });

        //UI
        this.load.spritesheet('cadreHat', '../assets/spritesheet/cadrehat.png',
            { frameWidth: 49, frameHeight: 48 });
        this.load.spritesheet('healthBar', '../assets/spritesheet/healthBarSS.png',
            { frameWidth: 320, frameHeight: 64 });

        //Mob
        this.load.spritesheet('mobGuepe', '../assets/spritesheet/guepeSS.png',
            { frameWidth: 32, frameHeight: 64 });

        this.load.spritesheet('moustique', '../assets/spritesheet/moustique.png',
            { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet('mobSpider', '../assets/spritesheet/spiderSS.png',
            { frameWidth: 64, frameHeight: 64 });

        //Texture Obstacle
        this.load.image("plantGrab", "../assets/planteGrab.png");
        this.load.image("breakFire", "../assets/breakFire.png");
        this.load.image("berry", "../assets/berry.png");

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

        //DevIMG
        this.load.image('waterCheckIMG', '../assets/waterCheck.png');
    }

    create() {
        //Animation Joueur//
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
                frames: [{ key: 'mobGuepe', frame: 0 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'guepe_agro',
                frames: [{ key: 'mobGuepe', frame: 1 }],
                frameRate: 20
            });

            //Spider
            this.anims.create({
                key: 'spider_base',
                frames: [{ key: 'mobSpider', frame: 0 }],
                frameRate: 20
            });

            //Moustique
            this.anims.create({
                key: 'moustique_mouv',
                frames: [{ key: 'moustique', frame: 0 }],
                frameRate: 20
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