import { _decorator, Component,} from 'cc';
const { ccclass, property } = _decorator;

@ccclass
export default class ChipItem extends Component {
    @property
    betAmount = 0;

    clickCallback = null;

    onChipClick() {
        this.clickCallback && this.clickCallback(this.betAmount, this.node);
    }

}
