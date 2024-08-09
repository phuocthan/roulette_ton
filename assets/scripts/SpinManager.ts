import { GameConst } from "./GameDefines";
import GameplayManager from "./GameplayManager";
import SoundManager from "./Sound/SoundManager";
import UserInfo from "./UserInfo";
import { Utils } from "./Utils";

import { _decorator, Component, Node, find, UITransform, EventKeyboard, KeyCode, Animation, CCInteger, PhysicsSystem2D, Label, Collider2D, IPhysics2DContact, Contact2DType, Vec2, Vec3, sys, AudioSource, AudioClip } from 'cc';
const { ccclass, property } = _decorator;
@ccclass
export default class SpinManager extends Component {
    private readonly ROULETTE_NUM = ['0', '28', '9', '26', '30', '11', '7', '20', '32', '17', '5', '22', '34', '15', '3', '24', '36', '13', '1', '00', '27', '10', '25', '29', '12', '8', '19', '31', '18', '6', '21', '33', '16', '4', '23', '35', '14', '2']
    private readonly RAD_PER_NUM = 360 / 38;
    private readonly TIME_TO_STOP = 6;
    @property(Node)
    highlightNode: Node = null;

    @property(Node)
    rouletteSpin: Node = null;

    @property(Node)
    ball: Node = null;
    // @property(Node)
    // ballSpr: Node = null;

    @property(Node)
    winPanel: Node = null;
    @property(Node)
    resultNode: Node = null;

    @property(Label)
    resultLbl: Label = null;

    @property(Node)
    allSpinNode: Node = null;

    @property(Node)
    stopBtnNode: Node = null;

    @property(Node)
    ballHighlight: Node = null;

    @property(Node)
    touchToSkip: Node = null;

    // @property(Node)
    // wheelHighlight: Node = null;

    // @property(GameplayManager)
    gameCtrl: GameplayManager = null;



    ballAnim: Animation = null;
    isSpinning: boolean = false;
    selectedNum: string;
    spinInfo: any;
    // ballParentNode: Node;
    // originalPosBall: Vec2;


    onLoad() {
        const tesst = this.ball.getComponent(Animation);
        this.winPanel.active = false;
        this.gameCtrl = find('Canvas/MainNode/Gameplay').getComponent('GameplayManager');
        // this.ballParentNode = this.ball.parent;
        // this.originalPosBall = this.ball.getPosition();
    }

    startSpin(spinInfo) {
        // const num = this.ROULETTE_NUM[n];
        let num = '' + spinInfo.spinResult;
        if (spinInfo.spinResult === 37) {
            num = '00';
        }
        // this.ball.removeFromParent();
        // this.ball.parent = this.ballParentNode;
        // this.ball.setPosition(this.originalPosBall);
        this.allSpinNode.angle = Utils.randomRange(0, 360, false);
        this.rouletteSpin.angle = 0;
        this.ball.parent.angle = 90;
        const idx_12 = this.ROULETTE_NUM.indexOf('12');
        const idx_num = this.ROULETTE_NUM.indexOf(num);
        this.ball.parent.angle += -this.RAD_PER_NUM * (idx_num - idx_12);
        this.rouletteSpin.parent.active = true;
        this.highlightNode.active = false;
        this.isSpinning = true;
        // this.ballAnim = this.ball.getComponent(Animation);
        // console.log('@@@ ball ', this.ball)
        // console.log('@@@ ballAnim ', this.ballAnim)
        this.ballAnim.play();
        this.winPanel.active = false;
        this.resultNode.active = false;
        this.selectedNum = num;
        this.spinInfo = spinInfo;
        SoundManager.inst.playWheelStart();
        setTimeout ( () => {
            this.touchToSkip.active = true;;
            // this.stopBtnNode.active = false;;
        }, 500)
        
        this.isForceStop = false;
    }

    isForceStop = false;

    onForceStopBtn() {
        if ( this.isForceStop) {
            return;
        }
        this.isForceStop = true;
        this.stopSpin();
        this.touchToSkip.active = false;
        // this.stopBtnNode.active = false;
    }

    stopSpin() {

        this.isSpinning = false;
        this.showResult();
        this.ballAnim = this.ball.getComponent(Animation);
        this.ballAnim.stop();

        if (this.isForceStop) {
            this.ballHighlight.active = true;
            this.ball.active = false;
        }
        SoundManager.inst.playWheelStop();
    }

    start() {
    }

    showResult() {
        let num = '' + this.spinInfo.spinResult;
        if (this.spinInfo.spinResult === 37) {
            num = '00';
        }
        this.highlightNode.active = true;
        const idx = this.ROULETTE_NUM.indexOf(num);
        this.highlightNode.angle = idx * -this.RAD_PER_NUM;
        this.resultNode.active = true;
        this.resultLbl.string = this.gameCtrl.getColor(num) + ' ' + num + '!';
        const isYouWin = this.spinInfo.youWin;
        const winAmount = this.spinInfo.winAmount

        setTimeout(() => {
            this.resultNode.active = false;
            this.showWinner(isYouWin, winAmount);
            isYouWin ? SoundManager.inst.playWin() : SoundManager.inst.playLose();
            this.gameCtrl.userBalance = this.gameCtrl.userBalance + this.spinInfo.winAmount + this.spinInfo.totalBetInWin;
            UserInfo.getInstance().gameFund = this.gameCtrl.userBalance;
            if ( this.gameCtrl.userBalance === 0) {
                // UserInfo.getInstance().timeToGetFreeCoinCd = Date.now() + 10 * 1000;
                UserInfo.getInstance().timeToGetFreeCoinCd = Date.now() + GameConst.FREE_REWARD_COUNTDOWN_TIME * 60 * 1000;
                // PopupManager.getInstance().showOutCoinPop();
            }

            this.gameCtrl.updateUserBalanceUI(true);
        }, 1250)
    }

    showWinner(isYouWin, numWin: number) {
        const winner = !isYouWin ? 'Dealer Win!' : 'You Win!'
        this.rouletteSpin.parent.active = false;
        this.highlightNode.active = false;
        this.winPanel.active = true;
        this.ballHighlight.active = false;
        this.ball.active = true;
        this.winPanel.children[0].getComponent(Label).string = winner;
        this.winPanel.children[1].children[2].getComponent(Label).string = '' + numWin + UserInfo.currency;
        this.winPanel.children[1].children[2].active = isYouWin;
        this.winPanel.children[1].children[0].active = false;
        this.winPanel.children[1].children[1].active = isYouWin;
        setTimeout(() => {
            this.gameCtrl.startNewGame();
        }, 1250)
    }


    startTime = this.TIME_TO_STOP;
    update(dt: number) {
        if (!this.isSpinning) {
            this.startTime = this.TIME_TO_STOP;
            return;
        } else {
            this.startTime -= dt;
            this.rouletteSpin.angle += (5.5 * this.startTime * dt * this.RAD_PER_NUM)
            if ( this.startTime < 0.2) {
                this.touchToSkip.active = false;
                // this.stopBtnNode.active = false;
            }
            if (this.startTime <= 0) {
                this.stopSpin();
            }
        }
    }


}
