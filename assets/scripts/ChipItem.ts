import { _decorator, Component, EventTouch, Input, Node, Prefab, find, UITransform, EventKeyboard, KeyCode, input, CCInteger, PhysicsSystem2D, Label, Collider2D, IPhysics2DContact, Contact2DType, Sprite, v3, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass
export default class ChipItem extends Component {
    // @property(Node)
    // test: Node = null;
    @property
    betAmount = 0;

    clickCallback = null;

    onChipClick() {
        this.clickCallback && this.clickCallback(this.betAmount, this.node);
        // console.log(this.test.scale)
        // this.test.scale = this.test.scale.multiplyScalar(0.5);
        // console.log(this.test.scale)
    }

}
