const { ccclass, property } = cc._decorator;

@ccclass
export default class ChipItem extends cc.Component {

    @property
    betAmount = 0;

    clickCallback = null;

    onChipClick() {
        this.clickCallback && this.clickCallback(this.betAmount, this.node);
    }

}
