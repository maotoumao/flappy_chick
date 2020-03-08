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
        // 篮球左移速度
        speed: 0,
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
        let action = cc.rotateBy(1, -360);
        this.node.runAction(cc.repeatForever(action));

    },

    start() {

    },

    update(dt) {
        this.node.x -= this.game.clock * this.speed;
        if (this.node.x < -770) {
            this.node.destroy();
        }
        /**
        if (this.isCross()) {
            this.game.onGameOver();
        }
        **/
    },

    /**
    isCross() {
        let basketballBorder = this.node.getBoundingBox();
        let cxkBorder = this.cxk.getBoundingBox();
        if (cxkBorder.intersects(basketballBorder)) {
            return true;
        }
    },
    **/

    onCollisionEnter: function (other, self) {
        console.log(other);
        this.game.onGameOver();
        
    }
});
