import UserInfo from "../UserInfo";
import SoundChannel, { FADE } from "./SoundChannel";
import SoundID from "./SoundID";

import { _decorator, Component, EventTouch, Input, Node, Prefab, find, UITransform, EventKeyboard, KeyCode, input, CCInteger, PhysicsSystem2D, Label, Collider2D, IPhysics2DContact, Contact2DType, Vec2, Vec3, sys, AudioSource, AudioClip } from 'cc';
const { ccclass, property } = _decorator;
export enum AudioClips {
    click_sfx,
    undo_sfx,
    pick_chip_sfx,
    put_chip_sfx,
    player_win_sfx,
    dealer_win_sfx,
    spin_wheel_sfx,
    stop_wheel_sfx
}

const ENGINE_CHANNEL = 3;
export enum SOUND_INDEX {
    CHANNEL,
    VOLUME,
    PRIORITY,
    LENGTH
}
const MAX_TICKET_NUMBER = 6
@ccclass
export default class SoundManager extends Component {
    public SOUND_INFO =
        [
            //Channel (0 -10) , Volume (0-1), Priority(0-10),
            0, 1, 0, // click_sfx
            1, 1, 0,// undo_sfx,
            2, 1, 0,// pick_chip_sfx
            3, 1, 0,// put_chip_sfx
            4, 1, 0,// player_win_sfx
            5, 1, 0,// dealer_win_sfx
            6, 1, 0,// spin_wheel_sfx
            7, 1, 0,// stop_wheel_sfx
        ];

    musicChannel: AudioSource = null;
    @property(Boolean)
    useSound: boolean = true;

    public static inst: SoundManager = null;

    @property({ type: AudioClip })
    click_sfx: AudioClip = null;
    @property({ type: AudioClip })
    undo_sfx: AudioClip = null;
    @property({ type: AudioClip })
    pick_chip_sfx: AudioClip = null;
    @property({ type: AudioClip })
    put_chip_sfx: AudioClip = null;
    @property({ type: AudioClip })
    player_win_sfx: AudioClip = null;
    @property({ type: AudioClip })
    dealer_win_sfx: AudioClip = null;
    @property({ type: AudioClip })
    spin_wheel_sfx: AudioClip = null;
    @property({ type: AudioClip })
    stop_wheel_sfx: AudioClip = null;

    SoundIDs: SoundID[] = [];
    _channels: SoundChannel[] = [];
    _channelLength: number = 0;

    static isMusicOn = true;
    wheelChannel: SoundChannel;
    onLoad() {
        SoundManager.inst = this;
    }

    public isSoundPlaying(ID: number) {
        // var state = audioEngine.getState(ID);
        // if (state == audioEngine.AudioState.PLAYING) {
        //     return true;
        // }
        return false;
    }

    start() {
        this._channelLength = this.SOUND_INFO.length / SOUND_INDEX.LENGTH + MAX_TICKET_NUMBER;
        for (let i = 0; i < this._channelLength; i++) {
            this._channels.push(new SoundChannel(i));
        }
    }

    private _playSFX(clip: AudioClip, volume: number, loop: boolean) {
        let id = null;

        if (clip != null && this.useSound) {
            // id = cc.audioEngine.play(clip, loop || false, 1);
            // cc.audioEngine.setVolume(id, volume);
        }
        return id;
    }

    public playSound(audioEnum: number, volume?: number, loop?: boolean) {
        if (!volume || volume > 1) volume = 1;
        if (volume < 0) volume = 0;
        let clip = this[this.enumToString(AudioClips, audioEnum)];
        if (Array.isArray(this[this.enumToString(AudioClips, audioEnum)])) {
            clip = this.randomArr(this[this.enumToString(AudioClips, audioEnum)])
        }
        let id = this._playSFX(clip, volume, loop);

        return id;
    }

    enumToString(enumType, value) {

        for (var k in enumType) if (enumType[k] == value) {
            return k;
        }
        return null;

    }

    randomArr(arr) {
        return arr[Math.floor(Math.random() * arr.length)]
    };

    public stopSound(audioId) {
        // cc.audioEngine.stopEffect(audioId)
    }

    public setVolume(audioId: number, volume: number) {
        if (volume < 0) volume = 0;
        // cc.audioEngine.setVolume(audioId, volume);
    }

    public playSFX(clip: AudioClips, loop: boolean = false, force: boolean = false, fade = FADE.NA): SoundChannel {
        if ( !UserInfo.getInstance().soundEnable) {
            return;
        }
        let c = this.SOUND_INFO[clip * (SOUND_INDEX.LENGTH) + SOUND_INDEX.CHANNEL];
        let v = this.SOUND_INFO[clip * (SOUND_INDEX.LENGTH) + SOUND_INDEX.VOLUME];
        this._channels[c].play(clip, v, loop, force, fade);
        return this._channels[c];
    }

    public stopSFX(clip: AudioClips) {
        for (let i = 0; i < this._channelLength; i++) {
            let c = this._channels[i];
            if (c.getClip() == clip && c.isPlaying()) {
                c.stop();
                break;
            }
        }
    }

    // update(dt) {
    //     if (this.useSound) {
    //         this._channels.forEach(e => {
    //             if (e) {
    //                 e.update();
    //             }
    //         });
    //     }
    // }

    playClickSFX() {
        this.playSFX(AudioClips.click_sfx);
    }

    playWin() {
        this.playSFX(AudioClips.player_win_sfx);
    }

    playLose() {
        this.playSFX(AudioClips.dealer_win_sfx);
    }

    playPickChip() {
        this.playSFX(AudioClips.pick_chip_sfx);
    }

    playPutChip() {
        this.playSFX(AudioClips.put_chip_sfx);
    }

    playWheelStart() {
        this.wheelChannel = this.playSFX(AudioClips.spin_wheel_sfx, true);
    }
    playWheelStop() {
        this.stopSFX(AudioClips.spin_wheel_sfx)
    }

}
