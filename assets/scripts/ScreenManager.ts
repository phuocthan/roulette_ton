import BaseScreen from "./BaseScreen";
import SoundManager from "./Sound/SoundManager";

import { _decorator, Component, EventTouch, Input, Node, Prefab, find, UITransform, EventKeyboard, KeyCode, input, CCInteger, PhysicsSystem2D, Label, Collider2D, IPhysics2DContact, Contact2DType, Vec2, Vec3, sys, AudioSource, AudioClip } from 'cc';
const { ccclass, property } = _decorator;
export enum SCREEN {
    LOGIN,
    GAMEPLAY,
}
@ccclass
export default class ScreenManager extends Component {
    private static _instance: ScreenManager = null;

    @property(Node)
    listScreen: Node[] = [];
    onLoad() {
        if (!ScreenManager._instance) {
            ScreenManager._instance = this;
        }
        // this.gotoGamePlayScreen()
        this.gotoLoginScreen()
    }
    public static getInstance(): ScreenManager {
        return ScreenManager._instance;
    }

    public gotoScreen(screen: SCREEN) {
        if (screen !== SCREEN.GAMEPLAY && SoundManager.inst) {
            SoundManager.inst.playClickSFX();
        }
        this.listScreen.forEach((s, i) => {
            s.active = i === screen;
            if (i === screen) {
                s.getComponent(BaseScreen).onShow();
            }
        })
    }

    public gotoLoginScreen() {
        this.gotoScreen(SCREEN.LOGIN);
    }

    public gotoGamePlayScreen() {
        this.gotoScreen(SCREEN.GAMEPLAY);
    }



}
