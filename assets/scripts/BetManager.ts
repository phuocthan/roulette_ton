import { _decorator, Component, EventTouch, Input, Node, Prefab, find, UITransform, EventKeyboard, KeyCode, input, CCInteger, PhysicsSystem2D, Label, Collider2D, IPhysics2DContact, Contact2DType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass
export default class BetManager extends Component {
    currentBets = [];
    lastNumBets = 0;
    addBet(bet: string) {
        this.currentBets.push(bet);
    }

    popBet() {
        if (this.currentBets.length > this.lastNumBets) {
            this.currentBets.pop()
        }
    }

    resetCurrentBet() {
        this.currentBets = [];
        this.lastNumBets = 0;
    }

    finishBets() {
        this.lastNumBets = this.currentBets.length;
    }

    getCurrentBet() {
        return this.currentBets;
    }
}
