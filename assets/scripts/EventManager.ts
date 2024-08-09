import { _decorator, Component, EventTouch, Input, Node, Prefab, find, UITransform, EventKeyboard, KeyCode, input, CCInteger, PhysicsSystem2D, Label, Collider2D, IPhysics2DContact, Contact2DType, Vec2, Vec3, sys } from 'cc';
const { ccclass, property } = _decorator;

export enum EventType {
  UPDATE_NAME = 'update_name',
  UPDATE_USER_ID = 'update_user_id',
  UPDATE_FUND = 'update_fund',
  UPDATE_USD = 'update_usd',
  UPDATE_TIME = 'update_usd',
}

@ccclass
export default class EventManager extends Component {
  private static _ist: EventManager = null;
  public static getInstance(): EventManager {
    return EventManager._ist
  }
  protected onLoad(): void {
    EventManager._ist = this;
  }

  public emit(event: EventType, param) {
    console.log('@@ emite event ', param)
    // let e = new cc.Event.EventCustom(event, true);
    // e.detail = param;
    // cc.systemEvent.dispatchEvent(e);
  }

}
