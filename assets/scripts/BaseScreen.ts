import { _decorator, Component, EventTouch, Input, Node, Prefab, find, UITransform, EventKeyboard, KeyCode, input, CCInteger, PhysicsSystem2D, Label, Collider2D, IPhysics2DContact, Contact2DType, Vec2, Vec3, sys, AudioSource, AudioClip } from 'cc';
const { ccclass, property } = _decorator;
@ccclass
export default class BaseScreen extends Component {


    onShow() {
        // do something in child class
    }

    onHide() {
        // do something in child class
    }
}
