import BaseScreen from "./BaseScreen";
import SoundManager from "./Sound/SoundManager";

import { _decorator, Component, EventTouch, Input, Node, Prefab, find, UITransform, EventKeyboard, KeyCode, input, CCInteger, PhysicsSystem2D, Label, Collider2D, IPhysics2DContact, Contact2DType, Vec2, Vec3, sys, AudioSource, AudioClip } from 'cc';
const { ccclass, property } = _decorator;
export enum SCREEN {
    WALLET,
    GAMEPLAY,
    LEADERBOARD,
    INVITE
}
@ccclass
export default class ScreenManager extends Component {
    private static _instance: ScreenManager = null;

    private lastBtnClick: Node = null;

    @property(Node)
    listScreen: Node[] = [];

    @property(Node)
    highlights: Node[] = [];
    onLoad() {
        if (!ScreenManager._instance) {
            ScreenManager._instance = this;
        }
        // this.gotoGamePlayScreen()
        this.gotoGamePlayScreen()
    }
    public static getInstance(): ScreenManager {
        return ScreenManager._instance;
    }

    public gotoScreen(screen: SCREEN) {
        if (screen !== SCREEN.GAMEPLAY && SoundManager.inst) {
            // SoundManager.inst.playClickSFX();
        }
        this.listScreen.forEach((s, i) => {
            s.active = i === screen;
            if (i === screen) {
                s.getComponent(BaseScreen).onShow();
            }
        })
        this.highlights.forEach((s, i) => {
            s.active = i === screen;
        })
    }

    public gotoLeaderboardScreen() {
        this.gotoScreen(SCREEN.LEADERBOARD);
    }
    public gotoWalletScreen() {
        this.gotoScreen(SCREEN.WALLET);
    }
    public gotoInviteScreen() {
        this.gotoScreen(SCREEN.INVITE);
    }

    public gotoGamePlayScreen() {
        this.gotoScreen(SCREEN.GAMEPLAY);
    }

    onButtonClick(event, data) {
        switch(data) {
            case 'wallet':
                this.gotoWalletScreen();
                break;
            case 'gameplay':
                this.gotoGamePlayScreen();
                break;
            case 'leaderboard':
                this.gotoLeaderboardScreen();
                break;
            case 'invite':
                this.gotoInviteScreen();
                break;
            default:
                break;
        }
    }



}
