import { _decorator, Component, EventTouch, Input, Node, Prefab, find, UITransform, EventKeyboard, KeyCode, input, CCInteger, PhysicsSystem2D, Label, Collider2D, IPhysics2DContact, Contact2DType, Vec2, Vec3, sys, AudioSource, AudioClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass
export default class HintBet extends Component {

    @property(Label)
    odds: Label = null;

    @property(Label)
    payout: Label = null;

    onLoad() {
        this.node.scale = new Vec3(2, 2, 2)
    }

    setData(odds, mul) {
        this.odds.string = 'Odds: ' + odds;
        this.payout.string = 'Win: x' + mul
    }

}
