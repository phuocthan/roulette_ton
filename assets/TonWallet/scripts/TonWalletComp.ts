import { _decorator, Component, EventTouch, Input, Node, Prefab, find, UITransform, EventKeyboard, KeyCode, input, CCInteger, PhysicsSystem2D, Label, Collider2D, IPhysics2DContact, Contact2DType } from 'cc';

import { GameFi, TonConnectUI, Address, toNano } from '@ton/cocos-sdk';
import { TelegramWebApp } from '../../cocos-telegram-miniapps/scripts/telegram-web';

const { ccclass, property } = _decorator;

export interface TonAddressConfig {
    tonAddress: string,
    jettonAddress?: string;
}

@ccclass('TonWalletComp')
export class TonWalletComp extends Component {

    @property(Label)
    connectLabel: Label;


    private _bTonInit: boolean = false;

    private _cocosGameFi: GameFi;
    private _connectUI;

    protected onLoad() {

        TelegramWebApp.Instance.init().then(res => {
            console.log("telegram web app init : ", res.success);
        });

        // fetch("http://127.0.0.1:3000/config", {method: 'GET'}).then(response => {
        //     return response.json();
        // }).then(value => {
        //     console.log("config : ", value);
        //     if (value.ok) {

        //         const addressConfig = {
        //             tonAddress: value.tokenRecipient,
        //             jettonAddress: value.jettonMaster
        //         } as TonAddressConfig;
        //         this.toolView.setTonAddressConfig(addressConfig); 

        //     } else {
        //         console.error('request config failed!');
        //     }
        // });


        this._initTonUI();
    }

    async _initTonUI() {


        let uiconnector = new TonConnectUI({
            manifestUrl: 'https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json'
        });
        this._cocosGameFi = await GameFi.create({
            connector: uiconnector
        });
        this._connectUI = this._cocosGameFi.walletConnector;

        const unsubscribeModal = this._connectUI.onModalStateChange(state => {
            console.log("model state changed! : ", state);

            this.updateConnect();
        });

        const unsubscribeConnectUI = this._connectUI.onStatusChange(info => {
            console.log("wallet info status changed : ", info);

            this.updateConnect();
        });

        this._bTonInit = true;
        this.updateConnect();
    }

    public isConnected(): boolean {
        if (!this._connectUI) {
            console.error("ton ui not inited!");
            return false;
        }
        return this._connectUI.connected;
    }

    private updateConnect() {
        if (this.isConnected()) {
            const address = this._connectUI.account.address;
            this.connectLabel.string = Address.parseRaw(address).toString( {testOnly: true, bounceable: false }).substring(0, 6) + '...';
        } else {
            this.connectLabel.string = "Connect Your Ton Wallet";
        }
    }

    public async openModal() {
        if (!this._bTonInit) return;

        if (this.isConnected()) {
            this._connectUI.disconnect();
        } else {
            this._connectUI.openModal();
        }
    }

}


