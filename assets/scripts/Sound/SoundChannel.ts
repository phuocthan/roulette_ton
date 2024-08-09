import SoundManager, { AudioClips } from "./SoundManager";
const FADE_RATE = 0.01;
export enum FADE {
    NA,
    IN,
    OUT,
    INOUT,
}

import { _decorator, Component, EventTouch, Input, Node, Prefab, find, UITransform, EventKeyboard, KeyCode, input, CCInteger, PhysicsSystem2D, Label, Collider2D, IPhysics2DContact, Contact2DType, Vec2, Vec3, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass
export default class SoundChannel {

    _playID: number = -1;
    _clipID: AudioClips = null;
    _channel: number = -1;
    _currentFade = FADE.NA;
    _currentVolume: number;
    _MAX_SOUND_VOLUME: number;
    _FADE_IN_RATE: number = FADE_RATE;
    _FADE_OUT_RATE: number = FADE_RATE;

    constructor(c: number) {
        this._channel = c;
    }

    public play(clip, volume, loop, force2Play: boolean = false, fade = FADE.NA) {
        this._clipID = clip;
        this._currentFade = fade;
        this._MAX_SOUND_VOLUME = volume;
        this._FADE_IN_RATE = volume / 100;
        this._FADE_OUT_RATE = volume / 100;
        if (fade == FADE.IN || fade == FADE.INOUT) {
            volume = 0.0005;
        }
        this._currentVolume = volume;
        this._playID = SoundManager.inst.playSound(clip, volume, loop);
        this.isFadeInComplete = false;
        this.isFadeOutComplete = false;
    }

    public getClip(): AudioClips {
        return this._clipID;
    }

    public isPlaying(): boolean {
        return SoundManager.inst.isSoundPlaying(this._playID);
    }

    setVolume(volume) {
        if (this._playID != -1) {
            SoundManager.inst.setVolume(this._playID, volume);
        }
    }

    public stop(force = false) {
        if (this._playID != -1) {
            SoundManager.inst.stopSound(this._playID);
        }
        this._playID = -1;
        this._clipID = null;
        this._currentFade = FADE.NA;
    }

    update() {
        if (this._currentFade == FADE.NA) {
            return;
        }
        if (this.isPlaying()) {
            let fadeType = this._currentFade;
            if (fadeType == FADE.INOUT) {
                if (!this.isFadeInComplete) {
                    fadeType = FADE.IN;
                }
                else {
                    fadeType = FADE.OUT
                }
            }

            switch (fadeType) {
                case FADE.IN:
                    {

                        if (this._currentVolume < this._MAX_SOUND_VOLUME) {
                            this._currentVolume += this._FADE_IN_RATE;
                            if (this._currentVolume >= this._MAX_SOUND_VOLUME) {
                                this._currentVolume = this._MAX_SOUND_VOLUME;
                                this.isFadeInComplete = true;
                            }
                            this.setVolume(this._currentVolume);
                        }
                        break;
                    }
                case FADE.OUT:
                    {
                        if (this._currentVolume > 0) {
                            this._currentVolume -= this._FADE_OUT_RATE;
                            if (this._currentVolume <= 0) {
                                this._currentVolume = 0;
                                this.isFadeOutComplete = true;
                            }
                            this.setVolume(this._currentVolume);
                        }
                        break;
                    }
            }
        }
    }

    isFadeInComplete: boolean = false;
    isFadeOutComplete: boolean = false;
}
