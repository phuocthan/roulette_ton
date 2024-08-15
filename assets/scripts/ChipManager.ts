import ChipItem from "./ChipItem";
export enum CHIP {
    CHIP_1,
    CHIP_10,
    CHIP_100,
    CHIP_500
}

import { _decorator, Component, EventTouch, Input, Node, Prefab, find, UITransform, EventKeyboard, KeyCode, input, CCInteger, PhysicsSystem2D, Label, Collider2D, IPhysics2DContact, Contact2DType, tween, Color, Graphics, Sprite, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass
export default class ChipManager extends Component {
    @property([ChipItem])
    chipItems: ChipItem[] = [];
    currChipNode: Node;
    onLoad() {
        this.activeChip(this.chipItems[CHIP.CHIP_1].node);
    }

    start() {
        this.chipItems.forEach((chip, i) => {
            chip.clickCallback = this.activeChip.bind(this);
        })
    }

    onTouchStart() {

    }

    private readonly _dimColor = new Color(92, 92, 92);
    private readonly _normalColor = new Color(255, 255, 255);

    activeChip(node: Node = null, anim = true) {
        this.chipItems.forEach((chip, i) => {
            chip.node.getComponent(Sprite).color = chip.node === node ? this._normalColor : this._dimColor;
            if (node) {
                this.currChipNode = node;
                // if (!anim) {
                //     node.scale = v3(1, 1, 1);
                //     return
                // }\
                const time = anim ? 0.025 : 0;
                tween(node)
                    .to(time, { scale: v3(0.95, 0.95, 0.95) })
                    .to(time, { scale: v3(1, 1, 1) })
                    .start();
            }
        })
    }

    activeChipAmount(amount : number) {
        this.chipItems.forEach((chip, i) => {
            chip.node.getComponent(Sprite).color = chip.betAmount === amount ? this._normalColor : this._dimColor;
            if ( chip.betAmount === amount ) {
                this.currChipNode = chip.node;
                tween(this.currChipNode)
                .to(0.15, { scale: v3(0.95, 0.95, 0.95) })
                .to(0.15, { scale: v3(1, 1, 1) })
                    .start();
            }
        })
    }

    onChipBetStart() {

    }

}
