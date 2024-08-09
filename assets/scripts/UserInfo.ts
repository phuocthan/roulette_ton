import EventManager, { EventType } from "./EventManager";
import { GameConst } from "./GameDefines";

import { _decorator, Component, EventTouch, Input, Node, Prefab, find, UITransform, EventKeyboard, KeyCode, input, CCInteger, PhysicsSystem2D, Label, Collider2D, IPhysics2DContact, Contact2DType, Vec2, Vec3, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass
export default class UserInfo extends Component {
  private static _ist : UserInfo = null;
  public static currency = ''
  public static getInstance() : UserInfo {
    return UserInfo._ist
  }
  protected onLoad(): void {
    UserInfo._ist = this;
  }
  private _passWord = '';
  public get passWord() {
    return this._passWord;
  }
  public set passWord(value) {
    this._passWord = value;
  }

  private _userName = '';
  public get userName() {
    return this._userName;
  }
  public set userName(value) {
    EventManager.getInstance().emit(EventType.UPDATE_NAME, {userName: value});
    this._userName = value;
  }

  private _walletAdrress = '';
  public get walletAdrress() {
    return this._walletAdrress;
  }
  public set walletAdrress(value) {
    this._walletAdrress = value;
  }

  private _userId = '';
  public get userId() {
    return this._userId;
  }
  public set userId(value) {
    EventManager.getInstance().emit(EventType.UPDATE_USER_ID, {userId: value});
    this._userId = value;
  }

  private _btcPrice = 0;
  public get btcPrice() {
    return this._btcPrice;
  }
  public set btcPrice(value) {
    this._btcPrice = value;
    EventManager.getInstance().emit(EventType.UPDATE_FUND, {gameFund: value});
  }

  private _gameFund = -99;
  public get gameFund() {
    if ( this._gameFund === -99) {
      
      this._gameFund = sys.localStorage.getItem('CHIP_AMOUNT') || GameConst.INIT_GAME_COINS;
    }
    return this._gameFund;
  }
  public set gameFund(value) {
    this._gameFund = value;
    EventManager.getInstance().emit(EventType.UPDATE_FUND, {gameFund: value});
    sys.localStorage.setItem('CHIP_AMOUNT', this._gameFund);
  }

  private _timeToGetFreeCoinCd = -99;
  public get timeToGetFreeCoinCd() {
    if ( this._timeToGetFreeCoinCd === -99) {
      
      this.timeToGetFreeCoinCd = sys.localStorage.getItem('TIME_COUNTDOWN') || 0;
    }
    return this._timeToGetFreeCoinCd;
  }
  public set timeToGetFreeCoinCd(value) {
    this._timeToGetFreeCoinCd = value;
    sys.localStorage.setItem('TIME_COUNTDOWN', this._timeToGetFreeCoinCd);
    EventManager.getInstance().emit(EventType.UPDATE_TIME, {});
  }

  private _chipAmount = -99;
  public get chipAmount() {
    if ( this._chipAmount === -99) {
      this._chipAmount === sys.localStorage.getItem('CHIP_AMOUNT') || 5000;
    }
    return this._chipAmount;
  }
  public set chipAmount(value) {
    EventManager.getInstance().emit(EventType.UPDATE_FUND, {gameFund: value});
    this._chipAmount = value;
  }

  
  private _soundEnable = true;
  public get soundEnable() {
    if (this._readSoundSetting) {
    } else {
      this._readSoundSetting = true;
      this._soundEnable = localStorage.getItem('SOUND_ENABLE') !== 'false';
    }
    return this._soundEnable;
  }
  public set soundEnable(value) {
    this._soundEnable = value
    localStorage.setItem('SOUND_ENABLE', value ? 'true' : 'false');
  }
  _readSoundSetting = false;
}
