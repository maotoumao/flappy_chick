// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        cxkAnimation: {
            default: null,
            type: cc.Node,
        },
        basketballPrefab: {
            default: null,
            type: cc.Prefab,
        },
        scoreLabel: {
            default: null,
            type: cc.Label
        }
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 鼠标事件
        this.node.on('mousedown', function (event) {
            if (event.getButton() === cc.Event.EventMouse.BUTTON_LEFT) {
                this.cxkAnimation.getComponent('cxk').speed = -350;
            }
        }, this);

        // 碰撞检测
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        


        this.cxkAnimation.getComponent('cxk').game = this;

        this.wallDistance = 0;
        // 当前没有经过的墙
        this.basketballWall = [];
        this.generateBasketballWall();
        // 最后一个墙
        this.lastBasketballWall = this.basketballWall[0];
        // 分数
        this.score = 0;
    },

    start() {

    },

    update(dt) {
        // 统一时钟周期
        this.clock = dt;

        // 生成新的墙
        if (this.lastBasketballWall && this.lastBasketballWall[0].x < this.wallDistance) {
            this.generateBasketballWall();
        }

        // 资源管理和得分
        this.passedFirst();
    },

    // 生成阻碍
    generateBasketballWall() {
        let upBasketballNums = Math.ceil(Math.random() * 9);
        let downBasketballNums = 8 - upBasketballNums;
        let basketballWall = []

        for (let i = 0; i < upBasketballNums; ++i) {
            let newBasketball = cc.instantiate(this.basketballPrefab);
            this.node.addChild(newBasketball);
            basketballWall.push(newBasketball);
            newBasketball.setPosition(670, 490 - i * 100);
            newBasketball.getComponent('basketball').game = this;
            newBasketball.getComponent('basketball').cxk = this.cxkAnimation;
        }

        for (let i = 0; i < downBasketballNums; ++i) {
            let newBasketball = cc.instantiate(this.basketballPrefab);
            this.node.addChild(newBasketball);
            basketballWall.push(newBasketball);
            newBasketball.setPosition(670, -490 + i * 100);
            newBasketball.getComponent('basketball').game = this;
            newBasketball.getComponent('basketball').cxk = this.cxkAnimation;
        }
        // 设置下一个墙的距离
        this.wallDistance = 350 - Math.ceil(Math.random() * 1100);

        // 加入已有的墙中
        this.basketballWall.push(basketballWall);
        this.lastBasketballWall = basketballWall;

    },

    // 判断是否通过第一个
    passedFirst() {
        let firstBasketballWall = this.basketballWall[0];
        if (firstBasketballWall) {
            let cxk = this.cxkAnimation;
            if (firstBasketballWall[0].x + 50 < cxk.x + Math.ceil(cxk.getContentSize()['width'] / 2)) {
                this.score += 1;
                this.scoreLabel.string = '' + this.score;
                this.basketballWall.shift();
            }
        }
    },
    onGameOver() {
        cc.director.pause();
    }


});
