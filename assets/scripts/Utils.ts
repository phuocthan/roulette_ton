import { _decorator, Component, EventTouch, Input, Node, Prefab, find, UITransform, EventKeyboard, KeyCode, input, CCInteger, PhysicsSystem2D, Label, Collider2D, IPhysics2DContact, Contact2DType, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
// var CryptoJS = require("crypto-js");
// Best practice is to import what is required:

@ccclass
export class Utils {
  /**
   * get World Position of Node
   * @param node node need get position
   */

  public static getWorldPos(node: Node) {
    return node.getWorldPosition();
  }

  /**
   * set World Position for Node with value
   * @param node node need set position
   * @param posWS world position
   */

  public static setWorldPos(node: Node, posWS: Vec3) {
    node.setWorldPosition(posWS)
    // node.setPosition(node.parent.convertToNodeSpaceAR(posWS));
  }

  /**
   * get random number between min and max. with rounded or not
   * @param min min value
   * @param max max value
   * @param int is Interger output
   */

  public static randomRange(min: number, max: number, int: boolean = false) {
    let delta = max - min;
    let rnd = Math.random();
    let result = min + rnd * delta;

    if (int) {
      result = Math.round(result);
    }
    return result;
  }

  /*
 * General utils for managing cookies in Typescript.
 */
static setCookie(name: string, val: string) {
  const date = new Date();
  const value = val;

  // Set it expire in 7 days
  date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
  name = btoa(name);

  // Set it
  document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/";
}

static getCookie(name: string) {
  name = btoa(name);
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  
  if (parts.length == 2) {
      return parts.pop().split(";").shift();
  }
}

static deleteCookie(name: string) {
  const date = new Date();

  // Set it expire in -1 days
  date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

  // Set it
  name = btoa(name);
  document.cookie = name+"=; expires="+date.toUTCString()+"; path=/";
}

// static encryptRequest(reqObj) {
//   let reqString = JSON.stringify(reqObj);
//   let iv = CryptoJS.lib.WordArray.random(256 / 16); //CryptoJS.enc.Utf8.parse(iv);
//   const CRYP_KEY = CryptoJS.enc.Utf8.parse(Utils.getEnKe());
//   let encrypted = CryptoJS.AES.encrypt(reqString, CRYP_KEY, { iv: iv });
//   return {
//       encryptedData: CryptoJS.enc.Hex.stringify(
//           CryptoJS.enc.Base64.parse("" + encrypted)
//       ),
//       iv: "" + CryptoJS.enc.Hex.stringify(encrypted.iv)
//   };
// }

// static getEnKe() {
//   return 'Z4UDE';
// }

// static decryptResponse(encryptedData, iv) {
//   var hexIV = CryptoJS.enc.Hex.parse(iv);
//   var hexEncryptedData = CryptoJS.enc.Base64.stringify(
//       CryptoJS.enc.Hex.parse(encryptedData)
//   );
//   const CRYP_KEY = CryptoJS.enc.Utf8.parse(Utils.getEnKe());
//   var decrypted = CryptoJS.AES.decrypt(hexEncryptedData, CRYP_KEY, {
//       iv: hexIV
//   });
//   return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
// }

// static ek = 'aHR0cHM6Ly9hc'

// static encrypt(text: string) {
//   // let dataEncrypted = CryptoJS.AES.encrypt(text, CryptoJS.SHA256(Utils.ek).toString()).toString();
//   let dataEncrypted = CryptoJS.HmacSHA1(text, Utils.ek).toString();
  
//   return dataEncrypted;
// }

}
