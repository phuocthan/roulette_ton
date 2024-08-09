import { AudioClips } from "./SoundManager";

import { _decorator, Component, EventTouch, Input, Node, Prefab, find, UITransform, EventKeyboard, KeyCode, input, CCInteger, PhysicsSystem2D, Label, Collider2D, IPhysics2DContact, Contact2DType, Vec2, Vec3, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass
export default class SoundID {

    _clip: AudioClips;
    _id: number = -1;
    constructor(clip: AudioClips) {

        this._clip = clip;
    }

    setPlayID(id: number) {
        this._id = id;
    }

    getClip() {
        return this._clip;
    }
    
    getPlayID() {
        return this._id;
    }

}
