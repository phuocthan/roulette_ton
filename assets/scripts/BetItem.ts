import { _decorator, Component, EventTouch, Input, Node, Prefab, find, UITransform, EventKeyboard, KeyCode, input, CCInteger, PhysicsSystem2D, Label, Collider2D, IPhysics2DContact, Contact2DType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass
export default class BetItem extends Component {

    betData = '';
    onTouchFnc = null;

    initBetData(betData, fnc) {
        this.betData = betData;
        this.onTouchFnc = fnc;
    }


    onLoad() {
        this.node.on(Node.EventType.TOUCH_MOVE, this.onBetTouch, this);
    }

    onBetTouch() {
        this.onTouchFnc && this.onTouchFnc(this.betData);
    }
}
