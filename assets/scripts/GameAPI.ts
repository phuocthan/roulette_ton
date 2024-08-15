
import { _decorator, Component, Node, find, UITransform, EventKeyboard, KeyCode, Animation, CCInteger, PhysicsSystem2D, Label, Collider2D, IPhysics2DContact, Contact2DType, Vec2, Vec3, sys, AudioSource, AudioClip } from 'cc';
import UserInfo from './UserInfo';
import GameplayManager from './GameplayManager';
const { ccclass, property } = _decorator;
@ccclass
export default class GameAPI extends Component {
  private apiServerURL = 'https://roulette.tonpoker.fun/'
  private static _ist : GameAPI = null;
  public static getInstance() : GameAPI {
    return GameAPI._ist
  }

  public token = '';
  protected onLoad(): void {
    GameAPI._ist = this;
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    let token = params.get('token');
    if (!token) {
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnYW1lIjoibXlnYW1lIiwiaWQiOjEyMzgwNjM4MTksIm1lc3NhZ2UiOjE0MywiY2hhdCI6MTIzODA2MzgxOSwiaWF0IjoxNzIzNjUwMzcxfQ.ruF0eQdSXiWZ0ziKu-YUAJruUj22SK9bfFvLWKMCKWE'
    }
    console.log('token ', token)
    this.token = token;

    this.getUserData( (response) => {
      // console.log('response ',response)
      // UserInfo.getInstance().gameFund = response.chips;
      // UserInfo.getInstance().chipAmount = response.chips;
      GameplayManager.getInstance().updateUserBalanceOnLoad(response.chips)
    })
  }

  postService(routt, param, callback) {
    var raw = JSON.stringify(param);
    var myHeaders = new Headers();
    // myHeaders = {
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${this.token}`,
    // };

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${this.token}`);
    let requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };
    fetch(this.apiServerURL + routt + '/', requestOptions)
    .then( (response) => response.text( ))
    .then( (result) => { 
      callback && callback(JSON.parse(result));
    })
    .catch(error => {
      console.log('error', error)
      callback && callback(null);
    });
  }
  getService(routt, callback) {
    // var raw = JSON.stringify(param);
    var myHeaders = new Headers();
    // myHeaders = {
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${this.token}`,
    // };

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${this.token}`);
    let requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders
    };
    fetch(this.apiServerURL + routt + '/', requestOptions)
    .then( (response) => response.text( ))
    .then( (result) => { 
      callback && callback(JSON.parse(result));
    })
    .catch(error => {
      console.log('error', error)
      callback && callback(null);
    });
  }

  getUserData(callback) {
    const routte = 'api/gameplay/user-data';
    this.getService(routte, callback)
  }

  login(param, callback) {
    const routte = 'login';
    this.postService(routte, param, callback)
  }

  signUp(param, callback) {
    const routte = 'signup';
    this.postService(routte, param, callback)
  }

  updatePass(param, callback) {
    const routte = 'updatepass';
    this.postService(routte, param, callback)
  }

  updateFund(param, callback) {
    const routte = 'funds';
    this.postService(routte, param, callback)
  }

  refund(param, callback) {
    const routte = 'cashout';
    this.postService(routte, param, callback)
  }

  bet(param, callback) {
    const routte = 'api/gameplay/roulette/bets';
    this.postService(routte, param, callback)
  }
}
