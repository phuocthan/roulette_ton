import BaseScreen from "./BaseScreen";
import BetItem from "./BetItem";
import BetManager from "./BetManager";
import ChipItem from "./ChipItem";
import ChipManager from "./ChipManager";
import { EventType } from "./EventManager";
import { GameConst } from "./GameDefines";
import HintBet from "./HintBet";
// import PopupManager from "./PopupManager";
import ScreenManager from "./ScreenManager";
import SoundManager from "./Sound/SoundManager";
import SpinManager from "./SpinManager";
import UserInfo from "./UserInfo";
import { Utils } from "./Utils";

// import { GameFi, TonConnectUI, Address, toNano } from '@ton/cocos-sdk';
import { _decorator, Component, EventTouch, Input, Node, Prefab, find, UITransform, EventKeyboard, KeyCode, input, CCInteger, PhysicsSystem2D, Label, Collider2D, IPhysics2DContact, Contact2DType, Vec2, Vec3, sys, AudioSource, AudioClip, Sprite, instantiate } from 'cc';
const { ccclass, property } = _decorator;

export enum BET_OPTION {
    G_1_12 = 'one_to_twelve',
    G_13_24 = 'thirteen_to_twentyfour',
    G_25_36 = 'twentyfive_to_thirtysix',
    G_1_18 = 'one_to_eighteen',
    G_19_36 = 'nineteen_to_thirtysix',
    G_EVEN = 'even',
    G_ODD = 'odd',
    G_RED = 'red',
    G_BLACK = 'black',
    G_1ST = 'one_to_thirtyfour',
    G_2ND = 'two_to_thirtyfive',
    G_3RD = 'three_to_thirtysix',
    G_1_3 = '1_3',
    G_4_6 = '4_6',
    G_7_9 = '7_9',
    G_10_12 = '10_12',
    G_13_15 = '13_15',
    G_16_18 = '16_18',
    G_19_21 = '19_21',
    G_22_24 = '22_24',
    G_25_27 = '25_27',
    G_28_30 = '28_30',
    G_31_33 = '31_33',
    G_34_36 = '34_36',

    G_1_6 = '1_6',
    G_4_9 = '4_9',
    G_7_12 = '7_12',
    G_10_15 = '10_15',
    G_13_18 = '13_18',
    G_16_21 = '16_21',
    G_19_24 = '19_24',
    G_22_27 = '22_27',
    G_25_30 = '25_30',
    G_28_33 = '28_33',
    G_31_36 = '31_36',
    G_0_00_1_2_3 = '0_00_1_2_3',
    G_0_1_2 = '0_1_2',
    G_0_1 = '0_1',
    G_0_2 = '0_2',
    G_0_00 = '0_00',
    G_0_00_2 = '0_00_2',
    G_00_2 = '00_2',
    G_00_3 = '00_3',
    G_00_2_3 = '00_2_3',
    G_1_2_4_5 = "1_2_4_5",
    G_2_3_5_6 = "2_3_5_6",
    G_4_5_7_8 = "4_5_7_8",
    G_5_6_8_9 = "5_6_8_9",
    G_7_8_10_11 = "7_8_10_11",
    G_8_9_11_12 = "8_9_11_12",
    G_10_11_13_14 = "10_11_13_14",
    G_11_12_14_15 = "11_12_14_15",
    G_13_14_16_17 = "13_14_16_17",
    G_14_15_17_18 = "14_15_17_18",
    G_16_17_19_20 = "16_17_19_20",
    G_17_18_20_21 = "17_18_20_21",
    G_19_20_22_23 = "19_20_22_23",
    G_20_21_23_24 = "20_21_23_24",
    G_22_23_25_26 = "22_23_25_26",
    G_23_24_26_27 = "23_24_26_27",
    G_25_26_28_29 = "25_26_28_29",
    G_26_27_29_30 = "26_27_29_30",
    G_28_29_31_32 = "28_29_31_32",
    G_29_30_32_33 = "29_30_32_33",
    G_31_32_34_35 = "31_32_34_35",
    G_32_33_35_36 = "32_33_35_36",

    G_1_2 = "1_2",
    G_2_3 = "2_3",
    G_2_5 = "2_5",
    G_3_6 = "3_6",
    G_5_4 = "5_4",
    G_5_6 = "5_6",
    G_4_1 = "4_1",

    G_5_8 = "5_8",
    G_6_9 = "6_9",
    G_7_8 = "7_8",
    G_8_9 = "8_9",
    G_4_7 = "4_7",

    G_8_11 = "8_11",
    G_9_12 = "9_12",
    G_10_11 = "10_11",
    G_11_12 = "11_12",
    G_7_10 = "7_10",

    G_11_14 = "11_14",
    G_12_15 = "12_15",
    G_13_14 = "13_14",
    G_14_15 = "14_15",
    G_10_13 = "10_13",

    G_14_17 = "14_17",
    G_15_18 = "15_18",
    G_16_17 = "16_17",
    G_17_18 = "17_18",
    G_13_16 = "13_16",

    G_17_20 = "17_20",
    G_18_21 = "18_21",
    G_19_20 = "19_20",
    G_20_21 = "20_21",
    G_16_19 = "16_19",

    G_20_23 = "20_23",
    G_21_24 = "21_24",
    G_22_23 = "22_23",
    G_23_24 = "23_24",
    G_19_22 = "19_22",

    G_23_26 = "23_26",
    G_24_27 = "24_27",
    G_25_26 = "25_26",
    G_26_27 = "26_27",
    G_22_25 = "22_25",

    G_26_29 = "26_29",
    G_27_30 = "27_30",
    G_28_29 = "28_29",
    G_29_30 = "29_30",
    G_25_28 = "25_28",

    G_29_32 = "29_32",
    G_30_33 = "30_33",
    G_31_32 = "31_32",
    G_32_33 = "32_33",
    G_28_31 = "28_31",

    G_32_35 = "32_35",
    G_33_36 = "33_36",
    G_34_35 = "34_35",
    G_35_36 = "35_36",
    G_31_34 = "31_34",

}

@ccclass

export default class GameplayManager extends BaseScreen {
    private static _instance: GameplayManager = null;
    private readonly G_1ST = ['1', '4', '7', '10', '13', '16', '19', '22', '25', '28', '31', '34'];
    private readonly G_2ND = ['2', '5', '8', '11', '14', '17', '20', '23', '26', '29', '32', '35'];
    private readonly G_3RD = ['3', '6', '9', '12', '15', '18', '21', '24', '27', '30', '33', '36'];
    private readonly G_RED = ['1', '3', '5', '7', '9', '12', '14', '16', '18', '19', '21', '23', '25', '27', '30', '32', '34', '36'];
    private readonly G_BLACK = ['2', '4', '6', '8', '10', '11', '13', '15', '17', '20', '22', '24', '26', '28', '29', '31', '33', '35'];
    private readonly G_GREEN = ['0', '00'];
    private readonly G_1_12 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    private readonly G_13_24 = ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
    private readonly G_25_36 = ['25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36']
    private readonly G_1_18 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
    private readonly G_19_36 = ['19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36']
    private readonly G_EVEN = ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30', '32', '34', '36'];
    private readonly G_ODD = ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19', '21', '23', '25', '27', '29', '31', '33', '35'];
    private readonly G_1_3 = ['1', '2', '3'];
    private readonly G_4_6 = ['4', '5', '6'];
    private readonly G_7_9 = ['7', '8', '9'];
    private readonly G_10_12 = ['10', '11', '12'];
    private readonly G_13_15 = ['13', '14', '15'];
    private readonly G_16_18 = ['16', '17', '18'];
    private readonly G_19_21 = ['19', '20', '21'];
    private readonly G_22_24 = ['22', '23', '24'];
    private readonly G_25_27 = ['25', '26', '27'];
    private readonly G_28_30 = ['28', '29', '30'];
    private readonly G_31_33 = ['31', '32', '33'];
    private readonly G_34_36 = ['34', '35', '36'];
    private readonly G_1_6 = ['1', '2', '3', '4', '5', '6'];
    private readonly G_4_9 = ['4', '5', '6', '7', '8', '9'];
    private readonly G_7_12 = ['7', '8', '9', '10', '11', '12'];
    private readonly G_10_15 = ['10', '11', '12', '13', '14', '15'];
    private readonly G_13_18 = ['13', '14', '15', '16', '17', '18'];
    private readonly G_16_21 = ['16', '17', '18', '19', '20', '21'];
    private readonly G_19_24 = ['19', '20', '21', '22', '23', '24'];
    private readonly G_22_27 = ['22', '23', '24', '25', '26', '27'];
    private readonly G_25_30 = ['25', '26', '27', '28', '29', '30'];
    private readonly G_28_33 = ['28', '29', '30', '31', '32', '33'];
    private readonly G_31_36 = ['31', '32', '33', '34', '35', '36'];
    private readonly G_0_00_1_2_3 = ['0', '00', '1', '2', '3'];
    private readonly G_0_1_2 = ['0', '1', '2'];
    private readonly G_0_1 = ['0', '1'];
    private readonly G_0_2 = ['0', '2'];
    private readonly G_0_00 = ['0', '00'];
    private readonly G_0_00_2 = ['0', '00', '2'];
    private readonly G_00_2 = ['00', '2'];
    private readonly G_00_3 = ['00', '3'];
    private readonly G_00_2_3 = ['00', '2', '3'];

    private readonly G_1_2_4_5 = ["1", "2", "4", "5"]
    private readonly G_2_3_5_6 = ["2", "3", "5", "6"]
    private readonly G_4_5_7_8 = ["4", "5", "7", "8"]
    private readonly G_5_6_8_9 = ["5", "6", "8", "9"]
    private readonly G_7_8_10_11 = ["7", "8", "10", "11"]
    private readonly G_8_9_11_12 = ["8", "9", "11", "12"]
    private readonly G_10_11_13_14 = ["10", "11", "13", "14"]
    private readonly G_11_12_14_15 = ["11", "12", "14", "15"]
    private readonly G_13_14_16_17 = ["13", "14", "16", "17"]
    private readonly G_14_15_17_18 = ["14", "15", "17", "18"]
    private readonly G_16_17_19_20 = ["16", "17", "19", "20"]
    private readonly G_17_18_20_21 = ["17", "18", "20", "21"]
    private readonly G_19_20_22_23 = ["19", "20", "22", "23"]
    private readonly G_20_21_23_24 = ["20", "21", "23", "24"]
    private readonly G_22_23_25_26 = ["22", "23", "25", "26"]
    private readonly G_23_24_26_27 = ["23", "24", "26", "27"]
    private readonly G_25_26_28_29 = ["25", "26", "28", "29"]
    private readonly G_26_27_29_30 = ["26", "27", "29", "30"]
    private readonly G_28_29_31_32 = ["28", "29", "31", "32"]
    private readonly G_29_30_32_33 = ["29", "30", "32", "33"]
    private readonly G_31_32_34_35 = ["31", "32", "34", "35"]
    private readonly G_32_33_35_36 = ["32", "33", "35", "36"]

    private readonly G_1_2 = ["1", "2"]
    private readonly G_2_3 = ["2", "3"]
    private readonly G_2_5 = ["2", "5"]
    private readonly G_3_6 = ["3", "6"]
    private readonly G_5_4 = ["5", "4"]
    private readonly G_5_6 = ["5", "6"]
    private readonly G_4_1 = ["4", "1"]

    private readonly G_5_8 = ["5", "8"]
    private readonly G_6_9 = ["6", "9"]
    private readonly G_7_8 = ["7", "8"]
    private readonly G_8_9 = ["8", "9"]
    private readonly G_4_7 = ["4", "7"]

    private readonly G_8_11 = ["8", "11"]
    private readonly G_9_12 = ["9", "12"]
    private readonly G_10_11 = ["10", "11"]
    private readonly G_11_12 = ["11", "12"]
    private readonly G_7_10 = ["7", "10"]

    private readonly G_11_14 = ["11", "14"]
    private readonly G_12_15 = ["12", "15"]
    private readonly G_13_14 = ["13", "14"]
    private readonly G_14_15 = ["14", "15"]
    private readonly G_10_13 = ["10", "13"]

    private readonly G_14_17 = ["14", "17"]
    private readonly G_15_18 = ["15", "18"]
    private readonly G_16_17 = ["16", "17"]
    private readonly G_17_18 = ["17", "18"]
    private readonly G_13_16 = ["13", "16"]

    private readonly G_17_20 = ["17", "20"]
    private readonly G_18_21 = ["18", "21"]
    private readonly G_19_20 = ["19", "20"]
    private readonly G_20_21 = ["20", "21"]
    private readonly G_16_19 = ["16", "19"]

    private readonly G_20_23 = ["20", "23"]
    private readonly G_21_24 = ["21", "24"]
    private readonly G_22_23 = ["22", "23"]
    private readonly G_23_24 = ["23", "24"]
    private readonly G_19_22 = ["19", "22"]

    private readonly G_23_26 = ["23", "26"]
    private readonly G_24_27 = ["24", "27"]
    private readonly G_25_26 = ["25", "26"]
    private readonly G_26_27 = ["26", "27"]
    private readonly G_22_25 = ["22", "25"]

    private readonly G_26_29 = ["26", "29"]
    private readonly G_27_30 = ["27", "30"]
    private readonly G_28_29 = ["28", "29"]
    private readonly G_29_30 = ["29", "30"]
    private readonly G_25_28 = ["25", "28"]

    private readonly G_29_32 = ["29", "32"]
    private readonly G_30_33 = ["30", "33"]
    private readonly G_31_32 = ["31", "32"]
    private readonly G_32_33 = ["32", "33"]
    private readonly G_28_31 = ["28", "31"]

    private readonly G_32_35 = ["32", "35"]
    private readonly G_33_36 = ["33", "36"]
    private readonly G_34_35 = ["34", "35"]
    private readonly G_35_36 = ["35", "36"]
    private readonly G_31_34 = ["31", "34"]


    @property(Node)
    betNode: Node = null;

    @property(Node)
    spinBtn: Node = null;

    @property(Node)
    placeBet: Node = null;

    @property(SpinManager)
    spinCtrl: SpinManager = null;

    @property(ChipManager)
    chipCtrl: ChipManager = null;

    @property(BetManager)
    betCtrl: BetManager = null;

    @property(Node)
    clearNode: Node = null;

    @property(Node)
    undoNode: Node = null;

    @property(Node)
    rebetNode: Node = null;

    @property(Node)
    doubleRebetNode: Node = null;

    // @property(Node)
    // settingPage: Node = null;

    betOptions: Node[] = [];
    betChipsRound: Node[] = [];
    board: Node = null;
    numLastBet: number = 0;
    betNum: any;

    userBalance = 0;
    betAmount = 0;
    @property(Label)
    userAmountLbl: Label = null;
    @property(Label)
    userBetAmountLbl: Label = null;
    tempBalance: number;

    betArrays = [];
    lastBetArray = [];
    showTimeout: number;

    @property(Prefab)
    hintBetPref: Prefab = null;
    hintBet: Node;

    onShow() {
        super.onShow();
        this.onUpdateTime();
        this.userBalance = UserInfo.getInstance().gameFund;
        this.updateUserBalanceUI();
    }

    start() {

    }
    onLoad() {
        if (!GameplayManager._instance) {
            GameplayManager._instance = this;
        }

        this.betOptions = this.betNode.children;
        this.spinCtrl.node.active = false;
        this.board = this.node.getChildByName('board');
        this.initBetOptions();
        this.node.getChildByName('controlTouch').on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.getChildByName('controlTouch').on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.getChildByName('controlTouch').on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.getChildByName('controlTouch').on(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
        this.startNewGame();
        this.userBalance = UserInfo.getInstance().gameFund;
        this.updateUserBalanceUI();
        // TO DO EVENT
        // systemEvent.on(EventType.UPDATE_USD, this.onUpdateTime.bind(this));
    }


    mustUpdateTime = false;
    onUpdateGameFund(data) {
        this.userAmountLbl.string = '' + data.detail.gameFund + UserInfo.currency;
        this.userBalance = data.detail.gameFund;
        this.updateUserBalanceUI();
    }

    protected lateUpdate(dt: number): void {
        if (  this.mustUpdateTime) {
            const countdownTime =  Math.ceil(UserInfo.getInstance().timeToGetFreeCoinCd - Date.now())/1000;

            if ( countdownTime > 0) {
                this.setCountdownTime(countdownTime);
            } else {
                this.mustUpdateTime = false;
                this.setCountdownTime();
            }
        }
    }

    @property(Node)
    countdownNode: Node = null;
    @property(Label)
    countdownLbl: Label = null;

    setCountdownTime(countdownTime = 0) {
        if ( countdownTime === 0 ) {
            this.countdownNode.active = false;
            if ( UserInfo.getInstance().gameFund === 0) {
                UserInfo.getInstance().gameFund = GameConst.FREE_REWARD_COINS;
            }
            return
        } else {
            this.countdownNode.active = true;
            this.countdownLbl.string = '' + new Date(countdownTime * 1000).toISOString().slice(11, 19)
        }
    }

    onUpdateTime() {
        this.mustUpdateTime = true;
    }

    public static getInstance(): GameplayManager {
        return GameplayManager._instance;
    }

    initBetOptions() {
        this.betOptions.forEach(bet => {
            const item = bet.addComponent(BetItem);
            item.initBetData(bet.name, this.onHighlightBet.bind(this))
        });
    }


    onTouchStart(event: EventTouch) {
        // const localPos = eventl
        const localPos = event.getLocation();
        const chips = this.chipCtrl.chipItems;
        // Touch on Chip
        for (let i = 0; i < chips.length; i++) {
            if (!chips[i].node.active) {
                continue;
            }
            const bounce = chips[i].node.getComponent(UITransform).getBoundingBoxToWorld();
            if (bounce.contains(localPos)) {
                SoundManager.inst.playPickChip();
                this.onClickOnChip(chips[i].node, localPos);
                return;
            }
        }

        // Touch on Table
        for (let i = this.betOptions.length - 1; i >= 0; i--) {
            const node = this.betOptions[i];
            if (!node.active) {
                continue;
            }
            const bounce = node.getComponent(UITransform).getBoundingBoxToWorld();
            if (bounce.contains(localPos)) {
                // console.log('@@ node',node)
                if (this.chipCtrl.currChipNode.active) {
                    // console.log('@@ node 2',node)
                    this.onClickOnChip(this.chipCtrl.currChipNode, localPos);
                    this.onClickOnBet(node, localPos);
                    SoundManager.inst.playPutChip();
                    return;
                } else {
                    // console.log('@@ gameFund 3',UserInfo.getInstance().gameFund)
                    if ( UserInfo.getInstance().gameFund == 0) {
                        // console.log('@@ gameFund 4',UserInfo.getInstance().gameFund)
                        // TO DO SHOW OUT COIN
                        // PopupManager.getInstance().showOutCoinPop();
                    }
                }
            }
        }
    }
    curMoveChip: Node = null;
    onClickOnChip(chipNode: Node, localPos: Vec2) {
        this.chipCtrl.activeChip(chipNode);
        this.curMoveChip = instantiate(this.chipCtrl.currChipNode);
        // TO DO
        // this.curMoveChip.scale = this.chipCtrl.currChipNode.scale * 0.35;
        // this.curMoveChip.parent = this.node;
        // Utils.setWorldPos(this.curMoveChip, localPos);
    }

    onClickOnBet(betNode, localPos) {
        betNode.getComponent(BetItem).onBetTouch();
        this.isBetting = true;
    }

    onTouchMove(event: Touch) {

        // TO DO
        // const localPos = event.getLocation();
        // if (this.curMoveChip) {
        //     Utils.setWorldPos(this.curMoveChip, localPos);
        // }
        // // Touch on Table
        // for (let i = this.betOptions.length - 1; i >= 0; i--) {
        //     const node = this.betOptions[i];
        //     if (!node.active) {
        //         continue;
        //     }
        //     const bounce = node.getBoundingBoxToWorld();
        //     if (bounce.contains(localPos) && this.chipCtrl.currChipNode.active) {
        //         // console.log('@@@ onTouchMove ', node)
        //         this.onClickOnBet(node, localPos);
        //         return;
        //     }
        // }
        this.unHighlightAllBet();
    }

    onTouchEnd(event: Touch) {
                // TO DO
        // const localPos = event.getLocation();
        // for (let i = this.betOptions.length - 1; i >= 0; i--) {
        //     const node = this.betOptions[i];
        //     if (!node.active) {
        //         continue;
        //     }
        //     const bounce = node.getBoundingBoxToWorld();
        //     // if (bounce.contains(localPos)) {
        //     if (bounce.contains(localPos) && this.chipCtrl.currChipNode.active) {
        //         this.onMakeBet(node);
        //         return;
        //     }
        // }
        if (this.curMoveChip) {
            this.curMoveChip.removeFromParent();
            this.curMoveChip = null;
        }

    }

    onHelpBtnClick() {
        // PopupManager.getInstance().showHelpPop();
    }
    lastHighlightName = '';
    onMouseMove(event: Touch) {
        // TO DO
        // const localPos = event.getLocation();
        // const found = false;
        // for (let i = this.betChipsRound.length - 1; i >= 0; i--) {
        //     const betChip = this.betChipsRound[i];
        //     const bounce = betChip.getBoundingBoxToWorld();
        //     if (bounce.contains(localPos)) {
        //         if (this.lastHighlightName !== betChip.name) {
        //             if (this.hintBet) {
        //                 this.hintBet.removeFromParent();
        //                 this.hintBet = null;
        //             }
        //             this.hintBet = instantiate(this.hintBetPref);
        //             const hintComp = this.hintBet.getComponent(HintBet);
        //             let odds = '';

        //             const betInfo = this.getOddsFromBet(betChip.name, 0);
        //             odds = betInfo['odds'];
        //             let mul = betInfo['mul'];
        //             let totalBet = this.getTotalBet(betChip.name);
        //             let payout = totalBet * mul;
        //             hintComp.setData(odds, mul);
        //             this.hintBet.name = betChip.name;
        //             this.hintBet.active = true;
        //             this.hintBet.parent = this.board;
        //             this.hintBet.x = betChip.x;
        //             this.hintBet.y = betChip.y + 70;
        //             this.lastHighlightName = betChip.name;
        //         }
        //         return;
        //     }

        // }

        this.lastHighlightName = '';
        if (this.hintBet) {
            this.hintBet.removeFromParent();
            this.hintBet = null;
        }
        return
    }

    getOddsFromBet(name: string, num: number) {
        let odd = '';
        let mul = 0;
        let numInString = num === 37 ? '00' : '' + num;
        let isWin = false;
        if (name.length <= 2) {
            return { odds: '2.6%', mul: 35, isWin: numInString === name };
        }

        switch (name) {
            case BET_OPTION.G_1_18:
                if (num >= 1 && num <= 18) {
                    isWin = true
                }
                odd = '47,37%'; mul = 1;
                break;
            case BET_OPTION.G_19_36:
                if (num >= 19 && num <= 36) {
                    isWin = true
                }
                odd = '47,37%'; mul = 1;
                break;
            case BET_OPTION.G_EVEN:
                if (num >= 1 && num <= 36 && num %2 === 0) {
                    isWin = true
                }
                odd = '47,37%'; mul = 1;
                break;
            case BET_OPTION.G_ODD:
                if (num >= 1 && num <= 36 && num %2 === 1) {
                    isWin = true
                }
                odd = '47,37%'; mul = 1;
                break;
            case BET_OPTION.G_BLACK:
                if ([2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '47,37%'; mul = 1;
                break;
            case BET_OPTION.G_RED:
                if ([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '47,37%'; mul = 1;
                break;
            case BET_OPTION.G_1ST:
                if ([1,4,7,10,13,16,19,22,25,28,31,34].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '31,6%'; mul = 2;
                break;
            case BET_OPTION.G_2ND:
                if ([2,5,8,11,14,17,20,23,26,29,32,35].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '31,6%'; mul = 2;
                break;
            case BET_OPTION.G_3RD:
                if ([3,6,9,12,15,18,21,24,27,30,33,36].indexOf(num) > -1) {
                    isWin = true
                }                
                odd = '31,6%'; mul = 2;
                break;
            case BET_OPTION.G_1_12:
                if (num >= 1 && num <= 12) {
                    isWin = true
                }
                odd = '31,6%'; mul = 2;
                break;
            case BET_OPTION.G_13_24:
                if (num >= 13 && num <= 24) {
                    isWin = true
                }
                odd = '31,6%'; mul = 2;
                break;
            case BET_OPTION.G_25_36:
                if (num >= 25 && num <= 36) {
                    isWin = true
                }
                odd = '31,6%'; mul = 2;
                break;

            case BET_OPTION.G_1_6:
                if (num >= 1 && num <= 6) {
                    isWin = true
                }
                odd = '15,8%'; mul = 5;
                break;

            case BET_OPTION.G_4_9:
                if (num >= 4 && num <= 9) {
                    isWin = true
                }
                odd = '15,8%'; mul = 5;
                break;

            case BET_OPTION.G_7_12:
                if (num >= 7 && num <= 12) {
                    isWin = true
                }
                odd = '15,8%'; mul = 5;
                break;

            case BET_OPTION.G_10_15:
                if (num >= 10 && num <= 15) {
                    isWin = true
                }
                odd = '15,8%'; mul = 5;
                break;

            case BET_OPTION.G_13_18:
                if (num >= 13 && num <= 18) {
                    isWin = true
                }
                odd = '15,8%'; mul = 5;
                break;

            case BET_OPTION.G_16_21:
                if (num >= 16 && num <= 21) {
                    isWin = true
                }
                odd = '15,8%'; mul = 5;
                break;

            case BET_OPTION.G_19_24:
                if (num >= 19 && num <= 24) {
                    isWin = true
                }
                odd = '15,8%'; mul = 5;
                break;

            case BET_OPTION.G_22_27:
                if (num >= 22 && num <= 27) {
                    isWin = true
                }
                odd = '15,8%'; mul = 5;
                break;

            case BET_OPTION.G_25_30:
                if (num >= 25 && num <= 30) {
                    isWin = true
                }
                odd = '15,8%'; mul = 5;
                break;

            case BET_OPTION.G_28_33:
                if (num >= 28 && num <= 33) {
                    isWin = true
                }
                odd = '15,8%'; mul = 5;
                break;

            case BET_OPTION.G_31_36:
                if (num >= 31 && num <= 36) {
                    isWin = true
                }
                odd = '15,8%'; mul = 5;
                break;

            case BET_OPTION.G_0_00_1_2_3:
                if ([0,1,2,3,37].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '13.2%'; mul = 6;
                break;

            // conor square
            case BET_OPTION.G_1_2_4_5:
                if ([1,2,4,5].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;
            case BET_OPTION.G_2_3_5_6:
                if ([2,3,5,6].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;
            case BET_OPTION.G_4_5_7_8:
                if ([4,5,7,8].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;
            case BET_OPTION.G_5_6_8_9:
                if ([5,6,8,9].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;
            case BET_OPTION.G_7_8_10_11:
                if ([7,8,10,11].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;
            case BET_OPTION.G_8_9_11_12:
                if ([8,9,11,12].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;
            case BET_OPTION.G_10_11_13_14:
                if ([10,11,13,14].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;
            case BET_OPTION.G_11_12_14_15:
                if ([11,12,14,15].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;
            case BET_OPTION.G_13_14_16_17:
                if ([13,14,16,17].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;
            case BET_OPTION.G_14_15_17_18:
                if ([14,15,17,18].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;
            case BET_OPTION.G_16_17_19_20:
                if ([16,17,19,20].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;
            case BET_OPTION.G_17_18_20_21:
                if ([17,18,20,21].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;
            case BET_OPTION.G_19_20_22_23:
                if ([19,20,22,23].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;
            case BET_OPTION.G_20_21_23_24:
                if ([20,21,23,24].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;
            case BET_OPTION.G_22_23_25_26:
                if ([23,22,25,26].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;
            case BET_OPTION.G_23_24_26_27:
                if ([23,24,26,27].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;
            case BET_OPTION.G_25_26_28_29:
                if ([25,26,28,29].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;
            case BET_OPTION.G_26_27_29_30:
                if ([26,27,29,30].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;
            case BET_OPTION.G_28_29_31_32:
                if ([28,29,31,32].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;
            case BET_OPTION.G_29_30_32_33:
                if ([29,30,32,33].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;
            case BET_OPTION.G_31_32_34_35:
                if ([31,32,34,35].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;
            case BET_OPTION.G_32_33_35_36:
                if ([32,33,35,36].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '10,5%'; mul = 8;
                break;

            // street
            case BET_OPTION.G_1_3:
                if ([1,2,3].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '7.9%'; mul = 11;
                break
            case BET_OPTION.G_4_6:
                if ([4,5,6].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '7.9%'; mul = 11;
                break
            case BET_OPTION.G_7_9:
                if ([7,8,9].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '7.9%'; mul = 11;
                break
            case BET_OPTION.G_10_12:
                if ([10,11,12].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '7.9%'; mul = 11;
                break
            case BET_OPTION.G_13_15:
                if ([13,14,15].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '7.9%'; mul = 11;
                break
            case BET_OPTION.G_16_18:
                if ([16,17,18].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '7.9%'; mul = 11;
                break
            case BET_OPTION.G_19_21:
                if ([19,20,21].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '7.9%'; mul = 11;
                break
            case BET_OPTION.G_22_24:
                if ([22,23,24].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '7.9%'; mul = 11;
                break
            case BET_OPTION.G_25_27:
                if ([25,26,27].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '7.9%'; mul = 11;
                break
            case BET_OPTION.G_28_30:
                if ([28,29,30].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '7.9%'; mul = 11;
                break
            case BET_OPTION.G_31_33:
                if ([31,32,33].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '7.9%'; mul = 11;
                break
            case BET_OPTION.G_34_36:
                if ([34,35,36].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '7.9%'; mul = 11;
                break
            // trio
            case BET_OPTION.G_00_2_3:
                if ([2,3,37].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '5.26%'; mul = 11;
            case BET_OPTION.G_0_00_2:
                if ([0,2,37].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '5.26%'; mul = 11;
            case BET_OPTION.G_0_1_2:
                if ([0,1,2].indexOf(num) > -1) {
                    isWin = true
                }
                odd = '5.26%'; mul = 11;
                break;
            default:
                odd = '5.3%'; mul = 17;
                break;

        }

        return { odds: odd, mul: mul, isWin: isWin }
    }

    getTotalBet(name: string) {
        let amount = 0;
        this.betArrays.forEach(bet => {
            if (name === bet.betType) {
                amount += bet.amount;
            }
        })
        return amount;
    }


    onMakeBet(node) {
        const betChip = instantiate(this.curMoveChip);
        this.curMoveChip.removeFromParent();
        this.curMoveChip = null;
        betChip.parent = this.board;
        betChip.name = node.name;
        const wPos = Utils.getWorldPos(node);
        Utils.setWorldPos(betChip, wPos);
        this.betChipsRound.push(betChip);
        this.unHighlightAllBet();
        this.betCtrl.addBet(node.name);
        this.updateBetStatusUndoClear();
        const bet = {
            betType: node.name,
            amount: betChip.getComponent(ChipItem).betAmount
        }
        this.betArrays.push(bet);
        if (this.hintBet) {
            this.hintBet.removeFromParent();
            this.hintBet = null;
            this.lastHighlightName = ''
        }
    }

    onHighlightBet(eventData: string) {
        this.unHighlightAllBet();
        // console.log('@@@ onHighlightBet ',eventData)
        if (eventData === '00' || eventData.length <= 2) {
            this.highlightBetNumber(eventData);
        } else {
            let group = [];
            let highlightGroup = true;
            switch (eventData) {
                case BET_OPTION.G_1_12:
                    group = this.G_1_12;
                    break;
                case BET_OPTION.G_13_24:
                    group = this.G_13_24;
                    break;
                case BET_OPTION.G_25_36:
                    group = this.G_25_36;
                    break;
                case BET_OPTION.G_1_18:
                    group = this.G_1_18;
                    break;
                case BET_OPTION.G_19_36:
                    group = this.G_19_36;
                    break;
                case BET_OPTION.G_EVEN:
                    group = this.G_EVEN;
                    break;
                case BET_OPTION.G_ODD:
                    group = this.G_ODD;
                    break;
                case BET_OPTION.G_RED:
                    group = this.G_RED;
                    break;
                case BET_OPTION.G_BLACK:
                    group = this.G_BLACK;
                    break;
                case BET_OPTION.G_1ST:
                    group = this.G_1ST;
                    break;
                case BET_OPTION.G_2ND:
                    group = this.G_2ND;
                    break;
                case BET_OPTION.G_3RD:
                    group = this.G_3RD;
                    break;
                case BET_OPTION.G_1_3:
                    highlightGroup = false;
                    group = this.G_1_3;
                    break;
                case BET_OPTION.G_4_6:
                    highlightGroup = false;
                    group = this.G_4_6;
                    break;
                case BET_OPTION.G_7_9:
                    highlightGroup = false;
                    group = this.G_7_9;
                    break;
                case BET_OPTION.G_10_12:
                    highlightGroup = false;
                    group = this.G_10_12;
                    break;
                case BET_OPTION.G_13_15:
                    highlightGroup = false;
                    group = this.G_13_15;
                    break;
                case BET_OPTION.G_16_18:
                    highlightGroup = false;
                    group = this.G_16_18;
                    break;
                case BET_OPTION.G_19_21:
                    highlightGroup = false;
                    group = this.G_19_21;
                    break;
                case BET_OPTION.G_22_24:
                    highlightGroup = false;
                    group = this.G_22_24;
                    break;
                case BET_OPTION.G_25_27:
                    highlightGroup = false;
                    group = this.G_25_27;
                    break;
                case BET_OPTION.G_28_30:
                    highlightGroup = false;
                    group = this.G_28_30;
                    break;
                case BET_OPTION.G_31_33:
                    highlightGroup = false;
                    group = this.G_31_33;
                    break;
                case BET_OPTION.G_34_36:
                    highlightGroup = false;
                    group = this.G_34_36;
                    break;
                case BET_OPTION.G_1_6:
                    highlightGroup = false;
                    group = this.G_1_6;
                    break;
                case BET_OPTION.G_4_9:
                    highlightGroup = false;
                    group = this.G_4_9;
                    break;
                case BET_OPTION.G_7_12:
                    highlightGroup = false;
                    group = this.G_7_12;
                    break;
                case BET_OPTION.G_10_15:
                    highlightGroup = false;
                    group = this.G_10_15;
                    break;
                case BET_OPTION.G_13_18:
                    highlightGroup = false;
                    group = this.G_13_18;
                    break;
                case BET_OPTION.G_16_21:
                    highlightGroup = false;
                    group = this.G_16_21;
                    break;
                case BET_OPTION.G_19_24:
                    highlightGroup = false;
                    group = this.G_19_24;
                    break;
                case BET_OPTION.G_22_27:
                    highlightGroup = false;
                    group = this.G_22_27;
                    break;
                case BET_OPTION.G_25_30:
                    highlightGroup = false;
                    group = this.G_25_30;
                    break;
                case BET_OPTION.G_28_33:
                    highlightGroup = false;
                    group = this.G_28_33;
                    break;
                case BET_OPTION.G_31_36:
                    highlightGroup = false;
                    group = this.G_31_36;
                    break;

                case BET_OPTION.G_0_00_1_2_3:
                    highlightGroup = false;
                    group = this.G_0_00_1_2_3;
                    break;

                case BET_OPTION.G_0_1_2:
                    highlightGroup = false;
                    group = this.G_0_1_2;
                    break;

                case BET_OPTION.G_0_1:
                    highlightGroup = false;
                    group = this.G_0_1;
                    break;

                case BET_OPTION.G_0_2:
                    highlightGroup = false;
                    group = this.G_0_2;
                    break;

                case BET_OPTION.G_0_00:
                    highlightGroup = false;
                    group = this.G_0_00;
                    break;
                case BET_OPTION.G_0_00_2:
                    highlightGroup = false;
                    group = this.G_0_00_2;
                    break;
                case BET_OPTION.G_00_2:
                    highlightGroup = false;
                    group = this.G_00_2;
                    break;
                case BET_OPTION.G_00_3:
                    highlightGroup = false;
                    group = this.G_00_3;
                    break;
                case BET_OPTION.G_00_2_3:
                    highlightGroup = false;
                    group = this.G_00_2_3;
                    break;
                case BET_OPTION.G_1_2_4_5:
                    highlightGroup = false;
                    group = this.G_1_2_4_5;
                    break;
                case BET_OPTION.G_2_3_5_6:
                    highlightGroup = false;
                    group = this.G_2_3_5_6;
                    break;
                case BET_OPTION.G_4_5_7_8:
                    highlightGroup = false;
                    group = this.G_4_5_7_8;
                    break;
                case BET_OPTION.G_5_6_8_9:
                    highlightGroup = false;
                    group = this.G_5_6_8_9;
                    break;
                case BET_OPTION.G_7_8_10_11:
                    highlightGroup = false;
                    group = this.G_7_8_10_11;
                    break;
                case BET_OPTION.G_8_9_11_12:
                    highlightGroup = false;
                    group = this.G_8_9_11_12;
                    break;
                case BET_OPTION.G_10_11_13_14:
                    highlightGroup = false;
                    group = this.G_10_11_13_14;
                    break;
                case BET_OPTION.G_11_12_14_15:
                    highlightGroup = false;
                    group = this.G_11_12_14_15;
                    break;
                case BET_OPTION.G_13_14_16_17:
                    highlightGroup = false;
                    group = this.G_13_14_16_17;
                    break;
                case BET_OPTION.G_14_15_17_18:
                    highlightGroup = false;
                    group = this.G_14_15_17_18;
                    break;
                case BET_OPTION.G_16_17_19_20:
                    highlightGroup = false;
                    group = this.G_16_17_19_20;
                    break;
                case BET_OPTION.G_17_18_20_21:
                    highlightGroup = false;
                    group = this.G_17_18_20_21;
                    break;
                case BET_OPTION.G_19_20_22_23:
                    highlightGroup = false;
                    group = this.G_19_20_22_23;
                    break;
                case BET_OPTION.G_20_21_23_24:
                    highlightGroup = false;
                    group = this.G_20_21_23_24;
                    break;
                case BET_OPTION.G_22_23_25_26:
                    highlightGroup = false;
                    group = this.G_22_23_25_26;
                    break;
                case BET_OPTION.G_23_24_26_27:
                    highlightGroup = false;
                    group = this.G_23_24_26_27;
                    break;
                case BET_OPTION.G_25_26_28_29:
                    highlightGroup = false;
                    group = this.G_25_26_28_29;
                    break;
                case BET_OPTION.G_26_27_29_30:
                    highlightGroup = false;
                    group = this.G_26_27_29_30;
                    break;
                case BET_OPTION.G_28_29_31_32:
                    highlightGroup = false;
                    group = this.G_28_29_31_32;
                    break;
                case BET_OPTION.G_29_30_32_33:
                    highlightGroup = false;
                    group = this.G_29_30_32_33;
                    break;
                case BET_OPTION.G_31_32_34_35:
                    highlightGroup = false;
                    group = this.G_31_32_34_35;
                    break;
                case BET_OPTION.G_32_33_35_36:
                    highlightGroup = false;
                    group = this.G_32_33_35_36;
                    break;
                case BET_OPTION.G_1_2:
                    highlightGroup = false;
                    group = this.G_1_2;
                    break;
                case BET_OPTION.G_2_3:
                    highlightGroup = false;
                    group = this.G_2_3;
                    break;

                case BET_OPTION.G_2_5:
                    highlightGroup = false;
                    group = this.G_2_5;
                    break;
                case BET_OPTION.G_3_6:
                    highlightGroup = false;
                    group = this.G_3_6;
                    break;
                case BET_OPTION.G_5_4:
                    highlightGroup = false;
                    group = this.G_5_4;
                    break;
                case BET_OPTION.G_5_6:
                    highlightGroup = false;
                    group = this.G_5_6;
                    break;
                case BET_OPTION.G_4_1:
                    highlightGroup = false;
                    group = this.G_4_1;
                    break;
                case BET_OPTION.G_5_8:
                    highlightGroup = false;
                    group = this.G_5_8;
                    break;
                case BET_OPTION.G_6_9:
                    highlightGroup = false;
                    group = this.G_6_9;
                    break;
                case BET_OPTION.G_7_8:
                    highlightGroup = false;
                    group = this.G_7_8;
                    break;
                case BET_OPTION.G_8_9:
                    highlightGroup = false;
                    group = this.G_8_9;
                    break;
                case BET_OPTION.G_4_7:
                    highlightGroup = false;
                    group = this.G_4_7;
                    break;
                case BET_OPTION.G_8_11:
                    highlightGroup = false;
                    group = this.G_8_11;
                    break;
                case BET_OPTION.G_9_12:
                    highlightGroup = false;
                    group = this.G_9_12;
                    break;
                case BET_OPTION.G_10_11:
                    highlightGroup = false;
                    group = this.G_10_11;
                    break;
                case BET_OPTION.G_11_12:
                    highlightGroup = false;
                    group = this.G_11_12;
                    break;
                case BET_OPTION.G_7_10:
                    highlightGroup = false;
                    group = this.G_7_10;
                    break;
                case BET_OPTION.G_11_14:
                    highlightGroup = false;
                    group = this.G_11_14;
                    break;
                case BET_OPTION.G_12_15:
                    highlightGroup = false;
                    group = this.G_12_15;
                    break;
                case BET_OPTION.G_14_15:
                    highlightGroup = false;
                    group = this.G_14_15;
                    break;
                case BET_OPTION.G_13_14:
                    highlightGroup = false;
                    group = this.G_13_14;
                    break;
                case BET_OPTION.G_10_13:
                    highlightGroup = false;
                    group = this.G_10_13;
                    break;
                case BET_OPTION.G_13_16:
                    highlightGroup = false;
                    group = this.G_13_16;
                    break;
                case BET_OPTION.G_17_18:
                    highlightGroup = false;
                    group = this.G_17_18;
                    break;
                case BET_OPTION.G_16_17:
                    highlightGroup = false;
                    group = this.G_16_17;
                    break;
                case BET_OPTION.G_15_18:
                    highlightGroup = false;
                    group = this.G_15_18;
                    break;
                case BET_OPTION.G_14_17:
                    highlightGroup = false;
                    group = this.G_14_17;
                    break;
                case BET_OPTION.G_17_20:
                    highlightGroup = false;
                    group = this.G_17_20;
                    break;
                case BET_OPTION.G_18_21:
                    highlightGroup = false;
                    group = this.G_18_21;
                    break;
                case BET_OPTION.G_19_20:
                    highlightGroup = false;
                    group = this.G_19_20;
                    break;
                case BET_OPTION.G_20_21:
                    highlightGroup = false;
                    group = this.G_20_21;
                    break;
                case BET_OPTION.G_16_19:
                    highlightGroup = false;
                    group = this.G_16_19;
                    break;
                case BET_OPTION.G_20_23:
                    highlightGroup = false;
                    group = this.G_20_23;
                    break;
                case BET_OPTION.G_21_24:
                    highlightGroup = false;
                    group = this.G_21_24;
                    break;
                case BET_OPTION.G_22_23:
                    highlightGroup = false;
                    group = this.G_22_23;
                    break;
                case BET_OPTION.G_23_24:
                    highlightGroup = false;
                    group = this.G_23_24;
                    break;
                case BET_OPTION.G_19_22:
                    highlightGroup = false;
                    group = this.G_19_22;
                    break;
                case BET_OPTION.G_23_26:
                    highlightGroup = false;
                    group = this.G_23_26;
                    break;
                case BET_OPTION.G_24_27:
                    highlightGroup = false;
                    group = this.G_24_27;
                    break;
                case BET_OPTION.G_25_26:
                    highlightGroup = false;
                    group = this.G_25_26;
                    break;
                case BET_OPTION.G_26_27:
                    highlightGroup = false;
                    group = this.G_26_27;
                    break;
                case BET_OPTION.G_22_25:
                    highlightGroup = false;
                    group = this.G_22_25;
                    break;
                case BET_OPTION.G_26_29:
                    highlightGroup = false;
                    group = this.G_26_29;
                    break;
                case BET_OPTION.G_27_30:
                    highlightGroup = false;
                    group = this.G_27_30;
                    break;
                case BET_OPTION.G_28_29:
                    highlightGroup = false;
                    group = this.G_28_29;
                    break;
                case BET_OPTION.G_29_30:
                    highlightGroup = false;
                    group = this.G_29_30;
                    break;
                case BET_OPTION.G_25_28:
                    highlightGroup = false;
                    group = this.G_25_28;
                    break;
                case BET_OPTION.G_29_32:
                    highlightGroup = false;
                    group = this.G_29_32;
                    break;
                case BET_OPTION.G_30_33:
                    highlightGroup = false;
                    group = this.G_30_33;
                    break;
                case BET_OPTION.G_31_32:
                    highlightGroup = false;
                    group = this.G_31_32;
                    break;
                case BET_OPTION.G_32_33:
                    highlightGroup = false;
                    group = this.G_32_33;
                    break;
                case BET_OPTION.G_28_31:
                    highlightGroup = false;
                    group = this.G_28_31;
                    break;
                case BET_OPTION.G_32_35:
                    highlightGroup = false;
                    group = this.G_32_35;
                    break;
                case BET_OPTION.G_33_36:
                    highlightGroup = false;
                    group = this.G_33_36;
                    break;
                case BET_OPTION.G_34_35:
                    highlightGroup = false;
                    group = this.G_34_35;
                    break;
                case BET_OPTION.G_35_36:
                    highlightGroup = false;
                    group = this.G_35_36;
                    break;
                case BET_OPTION.G_31_34:
                    highlightGroup = false;
                    group = this.G_31_34;
                    break;

            }
            if (highlightGroup) {
                this.highlightBetNumber(eventData);
            }
            this.onHighlightBetGroup(group);
        }
    }

    onHighlightBetGroup(group: string[]) {
        group.forEach(num => {
            this.highlightBetNumber(num);
        });

    }

    highlightBetNumber(num: string) {
        this.betOptions.forEach(bet => {
            // console.log('@@ bet ', bet.name)
            if (bet.name === num) {
                bet.getComponent(Sprite).enabled = bet.name === num;
            }
        });

    }

    unHighlightAllBet() {
        this.betOptions.forEach(bet => { bet.getComponent(Sprite).enabled = false });
    }

    parseBetParam() {
        let isBetType1, isBetType2 = false;
        let betTypeBE = 0;
        let singleBet = ['0', '00', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36']
        let singleBetBE = ["zero", "double_zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "twenty_one", "twenty_two", "twenty_three", "twenty_four", "twenty_five", "twenty_six", "twenty_seven", "twenty_eight", "twenty_nine", "thirty", "thirty_one", "thirty_two", "thirty_three", "thirty_four", "thirty_five", "thirty_six"]
        let param = {};
        // console.log(' this bet ',this.betArrays )
        this.betArrays.forEach(bet => {
            if (bet.betType === '00' || bet.betType.length <= 2) {
                // Single bet
                const betIndex = singleBet.indexOf(bet.betType);
                const betTypeBE = singleBetBE[betIndex];
                const curBetValue = param[betTypeBE] || 0;
                param[betTypeBE] = curBetValue + bet.amount
                if (bet.betType === '00' || bet.betType === '0') {
                    isBetType2 = true;
                } else {
                    isBetType1 = true;
                }
            }

            if (
                bet.betType === BET_OPTION.G_1_12 ||
                bet.betType === BET_OPTION.G_13_24 ||
                bet.betType === BET_OPTION.G_25_36 ||
                bet.betType === BET_OPTION.G_1_18 ||
                bet.betType === BET_OPTION.G_19_36 ||
                bet.betType === BET_OPTION.G_EVEN ||
                bet.betType === BET_OPTION.G_ODD ||
                bet.betType === BET_OPTION.G_RED ||
                bet.betType === BET_OPTION.G_BLACK ||
                bet.betType === BET_OPTION.G_1ST ||
                bet.betType === BET_OPTION.G_2ND ||
                bet.betType === BET_OPTION.G_3RD) {

                isBetType2 = true;
                const curBetValue = param[bet.betType] || 0;
                param[bet.betType] = curBetValue + bet.amount
            }

            let group = [];
            switch (bet.betType) {
                case BET_OPTION.G_1_3:
                    group = this.G_1_3;
                    break;
                case BET_OPTION.G_4_6:
                    group = this.G_4_6;
                    break;
                case BET_OPTION.G_7_9:
                    group = this.G_7_9;
                    break;
                case BET_OPTION.G_10_12:
                    group = this.G_10_12;
                    break;
                case BET_OPTION.G_13_15:
                    group = this.G_13_15;
                    break;
                case BET_OPTION.G_16_18:
                    group = this.G_16_18;
                    break;
                case BET_OPTION.G_19_21:
                    group = this.G_19_21;
                    break;
                case BET_OPTION.G_22_24:
                    group = this.G_22_24;
                    break;
                case BET_OPTION.G_25_27:
                    group = this.G_25_27;
                    break;
                case BET_OPTION.G_28_30:
                    group = this.G_28_30;
                    break;
                case BET_OPTION.G_31_33:
                    group = this.G_31_33;
                    break;
                case BET_OPTION.G_34_36:
                    group = this.G_34_36;
                    break;
                case BET_OPTION.G_1_6:
                    group = this.G_1_6;
                    break;
                case BET_OPTION.G_4_9:
                    group = this.G_4_9;
                    break;
                case BET_OPTION.G_7_12:
                    group = this.G_7_12;
                    break;
                case BET_OPTION.G_10_15:
                    group = this.G_10_15;
                    break;
                case BET_OPTION.G_13_18:
                    group = this.G_13_18;
                    break;
                case BET_OPTION.G_16_21:
                    group = this.G_16_21;
                    break;
                case BET_OPTION.G_19_24:
                    group = this.G_19_24;
                    break;
                case BET_OPTION.G_22_27:
                    group = this.G_22_27;
                    break;
                case BET_OPTION.G_25_30:
                    group = this.G_25_30;
                    break;
                case BET_OPTION.G_28_33:
                    group = this.G_28_33;
                    break;
                case BET_OPTION.G_31_36:
                    group = this.G_31_36;
                    break;
                case BET_OPTION.G_0_00_1_2_3:
                    group = this.G_0_00_1_2_3;
                    break;
                case BET_OPTION.G_0_1_2:
                    group = this.G_0_1_2;
                    break;
                case BET_OPTION.G_0_1:
                    group = this.G_0_1;
                    break;
                case BET_OPTION.G_0_2:
                    group = this.G_0_2;
                    break;
                case BET_OPTION.G_0_00:
                    group = this.G_0_00;
                    break;
                case BET_OPTION.G_0_00_2:
                    group = this.G_0_00_2;
                    break;
                case BET_OPTION.G_00_2:
                    group = this.G_00_2;
                    break;
                case BET_OPTION.G_00_3:
                    group = this.G_00_3;
                    break;
                case BET_OPTION.G_00_2_3:
                    group = this.G_00_2_3;
                    break;
                case BET_OPTION.G_1_2_4_5:
                    group = this.G_1_2_4_5;
                    break;
                case BET_OPTION.G_2_3_5_6:
                    group = this.G_2_3_5_6;
                    break;
                case BET_OPTION.G_4_5_7_8:
                    group = this.G_4_5_7_8;
                    break;
                case BET_OPTION.G_5_6_8_9:
                    group = this.G_5_6_8_9;
                    break;
                case BET_OPTION.G_7_8_10_11:
                    group = this.G_7_8_10_11;
                    break;
                case BET_OPTION.G_8_9_11_12:
                    group = this.G_8_9_11_12;
                    break;
                case BET_OPTION.G_10_11_13_14:
                    group = this.G_10_11_13_14;
                    break;
                case BET_OPTION.G_11_12_14_15:
                    group = this.G_11_12_14_15;
                    break;
                case BET_OPTION.G_13_14_16_17:
                    group = this.G_13_14_16_17;
                    break;
                case BET_OPTION.G_14_15_17_18:
                    group = this.G_14_15_17_18;
                    break;
                case BET_OPTION.G_16_17_19_20:
                    group = this.G_16_17_19_20;
                    break;
                case BET_OPTION.G_17_18_20_21:
                    group = this.G_17_18_20_21;
                    break;
                case BET_OPTION.G_19_20_22_23:
                    group = this.G_19_20_22_23;
                    break;
                case BET_OPTION.G_20_21_23_24:
                    group = this.G_20_21_23_24;
                    break;
                case BET_OPTION.G_22_23_25_26:
                    group = this.G_22_23_25_26;
                    break;
                case BET_OPTION.G_23_24_26_27:
                    group = this.G_23_24_26_27;
                    break;
                case BET_OPTION.G_25_26_28_29:
                    group = this.G_25_26_28_29;
                    break;
                case BET_OPTION.G_26_27_29_30:
                    group = this.G_26_27_29_30;
                    break;
                case BET_OPTION.G_28_29_31_32:
                    group = this.G_28_29_31_32;
                    break;
                case BET_OPTION.G_29_30_32_33:
                    group = this.G_29_30_32_33;
                    break;
                case BET_OPTION.G_31_32_34_35:
                    group = this.G_31_32_34_35;
                    break;
                case BET_OPTION.G_32_33_35_36:
                    group = this.G_32_33_35_36;
                    break;
                case BET_OPTION.G_1_2:
                    group = this.G_1_2;
                    break;
                case BET_OPTION.G_2_3:
                    group = this.G_2_3;
                    break;
                case BET_OPTION.G_2_5:
                    group = this.G_2_5;
                    break;
                case BET_OPTION.G_3_6:
                    group = this.G_3_6;
                    break;
                case BET_OPTION.G_5_4:
                    group = this.G_5_4;
                    break;
                case BET_OPTION.G_5_6:
                    group = this.G_5_6;
                    break;
                case BET_OPTION.G_4_1:
                    group = this.G_4_1;
                    break;
                case BET_OPTION.G_5_8:
                    group = this.G_5_8;
                    break;
                case BET_OPTION.G_6_9:
                    group = this.G_6_9;
                    break;
                case BET_OPTION.G_7_8:
                    group = this.G_7_8;
                    break;
                case BET_OPTION.G_8_9:
                    group = this.G_8_9;
                    break;
                case BET_OPTION.G_4_7:
                    group = this.G_4_7;
                    break;
                case BET_OPTION.G_8_11:
                    group = this.G_8_11;
                    break;
                case BET_OPTION.G_9_12:
                    group = this.G_9_12;
                    break;
                case BET_OPTION.G_10_11:
                    group = this.G_10_11;
                    break;
                case BET_OPTION.G_11_12:
                    group = this.G_11_12;
                    break;
                case BET_OPTION.G_7_10:
                    group = this.G_7_10;
                    break;
                case BET_OPTION.G_11_14:
                    group = this.G_11_14;
                    break;
                case BET_OPTION.G_12_15:
                    group = this.G_12_15;
                    break;
                case BET_OPTION.G_14_15:
                    group = this.G_14_15;
                    break;
                case BET_OPTION.G_13_14:
                    group = this.G_13_14;
                    break;
                case BET_OPTION.G_10_13:
                    group = this.G_10_13;
                    break;
                case BET_OPTION.G_13_16:
                    group = this.G_13_16;
                    break;
                case BET_OPTION.G_17_18:
                    group = this.G_17_18;
                    break;
                case BET_OPTION.G_16_17:
                    group = this.G_16_17;
                    break;
                case BET_OPTION.G_15_18:
                    group = this.G_15_18;
                    break;
                case BET_OPTION.G_14_17:
                    group = this.G_14_17;
                    break;
                case BET_OPTION.G_17_20:
                    group = this.G_17_20;
                    break;
                case BET_OPTION.G_18_21:
                    group = this.G_18_21;
                    break;
                case BET_OPTION.G_19_20:
                    group = this.G_19_20;
                    break;
                case BET_OPTION.G_20_21:
                    group = this.G_20_21;
                    break;
                case BET_OPTION.G_16_19:
                    group = this.G_16_19;
                    break;
                case BET_OPTION.G_20_23:
                    group = this.G_20_23;
                    break;
                case BET_OPTION.G_21_24:
                    group = this.G_21_24;
                    break;
                case BET_OPTION.G_22_23:
                    group = this.G_22_23;
                    break;
                case BET_OPTION.G_23_24:
                    group = this.G_23_24;
                    break;
                case BET_OPTION.G_19_22:
                    group = this.G_19_22;
                    break;
                case BET_OPTION.G_23_26:
                    group = this.G_23_26;
                    break;
                case BET_OPTION.G_24_27:
                    group = this.G_24_27;
                    break;
                case BET_OPTION.G_25_26:
                    group = this.G_25_26;
                    break;
                case BET_OPTION.G_26_27:
                    group = this.G_26_27;
                    break;
                case BET_OPTION.G_22_25:
                    group = this.G_22_25;
                    break;
                case BET_OPTION.G_26_29:
                    group = this.G_26_29;
                    break;
                case BET_OPTION.G_27_30:
                    group = this.G_27_30;
                    break;
                case BET_OPTION.G_28_29:
                    group = this.G_28_29;
                    break;
                case BET_OPTION.G_29_30:
                    group = this.G_29_30;
                    break;
                case BET_OPTION.G_25_28:
                    group = this.G_25_28;
                    break;
                case BET_OPTION.G_29_32:
                    group = this.G_29_32;
                    break;
                case BET_OPTION.G_30_33:
                    group = this.G_30_33;
                    break;
                case BET_OPTION.G_31_32:
                    group = this.G_31_32;
                    break;
                case BET_OPTION.G_32_33:
                    group = this.G_32_33;
                    break;
                case BET_OPTION.G_28_31:
                    group = this.G_28_31;
                    break;
                case BET_OPTION.G_32_35:
                    group = this.G_32_35;
                    break;
                case BET_OPTION.G_33_36:
                    group = this.G_33_36;
                    break;
                case BET_OPTION.G_34_35:
                    group = this.G_34_35;
                    break;
                case BET_OPTION.G_35_36:
                    group = this.G_35_36;
                    break;
                case BET_OPTION.G_31_34:
                    group = this.G_31_34;
                    break;

            }

            if (group.length > 0) {
                let splitAmout = parseFloat((bet.amount / group.length).toFixed(3));
                group.forEach(splitBet => {
                    // Single bet
                    const betIndex = singleBet.indexOf(splitBet);
                    const betTypeBE = singleBetBE[betIndex];
                    const curBetValue = param[betTypeBE] || 0;
                    param[betTypeBE] = curBetValue + splitAmout
                    if (splitBet === '0' || splitBet === '00') {
                        isBetType2 = true;
                    } else {
                        isBetType1 = true;
                    }
                })
            }
        })
        if (isBetType1 && isBetType2) {
            betTypeBE = 3;
        } else {
            betTypeBE = isBetType1 ? 1 : 2;
        }
        param['play_type'] = betTypeBE;
        return param;
    }

    isSpinning = false;

    onSpinBtnClick() {
        if (this.isSpinning) {
            return;
        }
        let param = this.parseBetParam();

        const successCallback = () => {
            this.placeBet.active = false;
            this.numLastBet = this.betChipsRound.length;
            this.updateUserBalance();
            this.isSpinning = false;
        }

        let isWin = false
        let totalWin = 0;
        let totalBetInWin = 0;
        this.spinCtrl.node.active = true;
        const rand = Utils.randomRange(0,37,true);
        for (let i =0; i < this.betArrays.length; i++) {
            const bet = this.betArrays[i];
            const betResponse = this.getOddsFromBet(bet.betType, rand);
            if (betResponse.isWin) {
                isWin = true;
                totalWin += bet.amount * betResponse.mul;
                totalBetInWin += bet.amount;
            }
        }
        let response = {
            spinResult: rand,
            winAmount: totalWin,
            totalBetInWin: totalBetInWin,
            youWin: isWin

        }
        this.spinCtrl.startSpin(response);
        successCallback();
        this.updateUserBalanceUI(true);
    }

    startNewGame() {
        clearTimeout(this.showTimeout);
        this.isBetting = false;
        this.spinCtrl.node.active = false;
        this.placeBet.active = true;
        this.onClearBtnClick();
        this.updateBetStatusUndoClear();
        this.lastBetArray = this.betArrays || [];
        this.betArrays = [];
        // console.log('@@@ this.lastBetArray ',this.lastBetArray)

        this.rebetNode.active = this.doubleRebetNode.active = false;
        this.checkConditionShowBetOption();
        // this.updateHistory();

    }

    onClickRebetBtn() {
        this.rebetNode.active = this.doubleRebetNode.active = false;
        this.makeRebet()
    }

    onClickDoubleRebetBtn() {
        this.rebetNode.active = this.doubleRebetNode.active = false;
        const curBet = [...this.lastBetArray]
        curBet.forEach(bet => this.lastBetArray.push(bet))
        this.makeRebet();
    }

    makeRebet() {
        this.lastBetArray.forEach(bet => { 
            const betNode = this.betNode.getChildByName(bet.betType);
            this.chipCtrl.activeChipAmount(bet.amount)
            this.curMoveChip = instantiate(this.chipCtrl.currChipNode);
            this.curMoveChip.scale = this.chipCtrl.currChipNode.scale.multiplyScalar(0.3)
            this.onMakeBet(betNode)
        })
    }

    checkConditionShowBetOption() {
        if ( this.lastBetArray.length  > 0) {
            let totalBet = 0;
            this.lastBetArray.forEach(bet => { totalBet +=  bet.amount })
            if (UserInfo.getInstance().gameFund >= totalBet) {
            // if (UserInfo.getInstance().chipAmount >= totalBet) {
                this.rebetNode.active = true;
            }
            if (UserInfo.getInstance().gameFund >= totalBet * 2) {
                this.doubleRebetNode.active = true;
            }
        } else {
            // return false;
        }
    }



    onRebetBtnClick() {


    }

    getColor(num: string) {
        if (this.G_GREEN.indexOf(num) >= 0) {
            return 'Green';
        } else if (this.G_RED.indexOf(num) >= 0) {
            return 'Red';
        } else if (this.G_BLACK.indexOf(num) >= 0) {
            return 'Black';
        }
    }

    private _isBetting = false;
    public get isBetting() {
        return this._isBetting;
    }
    public set isBetting(value) {
        this._isBetting = value;
    }

    onClearBtnClick() {
        this.betCtrl.resetCurrentBet();
        this.betChipsRound.forEach(bet => {
            bet.removeFromParent();
            bet = null;
        })
        this.betChipsRound = [];
        this.numLastBet = 0;
        this.updateBetStatusUndoClear();
    }

    OnUndoBtnClick() {
        this.betCtrl.popBet();
        if (this.betChipsRound.length > this.numLastBet) {
            this.betChipsRound[this.betChipsRound.length - 1].removeFromParent();
            this.betChipsRound[this.betChipsRound.length - 1] = null;

            this.betChipsRound.pop();
            this.updateBetStatusUndoClear();
            this.betArrays.pop();
        }
    }

    updateBetStatusUndoClear() {
        this.undoNode.active = this.clearNode.active = false;
        if (this.betChipsRound.length > 0) {
            if (this.betChipsRound.length <= this.numLastBet) {
                this.clearNode.active = true;
            } else {
                this.undoNode.active = true;
            }
        }
        this.spinBtn.active = this.undoNode.active || this.clearNode.active;
        this.updateUserBalanceUI();
    }

    updateUserBalanceUI(resetAmount = false) {
        let amount = 0;
        this.betChipsRound.forEach((chip) => {
            amount += chip.getComponent(ChipItem).betAmount;
        })
        if (resetAmount) {
            amount = 0;
        }
        this.betAmount = amount;
        this.userBetAmountLbl.node.active = this.betAmount > 0;
        this.userBetAmountLbl.node.parent.children[1].active = this.betAmount > 0;
        this.userBetAmountLbl.string = '' + this.betAmount + UserInfo.currency;
        
        this.userAmountLbl.string = '' + (this.userBalance - this.betAmount) + UserInfo.currency;
        this.tempBalance = this.userBalance - this.betAmount;
        const chips = this.chipCtrl.chipItems
        for (let i = 0; i < chips.length; i++) {
            chips[i].node.active = chips[i].getComponent(ChipItem).betAmount <= this.tempBalance;
        }
    }

    updateUserBalance(addAmount = 0) {
        this.userBalance = this.tempBalance + addAmount;
    }
    

    onLogOutBtnClick() {

        SoundManager.inst.playClickSFX();
        // const logOutFnc = () => {
        //     this.betCtrl.resetCurrentBet();
        //     this.betChipsRound.forEach(bet => {
        //         bet.removeFromParent();
        //         bet = null;
        //         this.updateBetStatusUndoClear();
        //     })
        //     this.betChipsRound = [];

        //     this.updateUserBalanceUI();
        //     ScreenManager.getInstance().gotoLoginScreen();
        //     this.betArrays = []
        // };

        // PopupManager.getInstance().showConfirmPopUp(logOutFnc);

    }
}
