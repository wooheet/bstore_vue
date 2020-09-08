import {
    VuexModule,
    Module,
    action,
    getter,
    mutation,
} from 'vuex-class-component'

import Transaction from '~/types/transaction';

const yggjs = require('@yggdrash/sdk');

const branchId = "a1d0ade6dcb5db356c2e8a5ee09d2568072eef09";
const contractVersion = "19b9710dc8f0442d09a1b5e632f7200afe751d60";

const txHeader = (body: any, ygg: any) => {
    const timestamp = ygg.utils.decimalToHex(new Date().getTime());
    const header = {
        "chain":`0x${branchId}`,
        "version":`0x0000000000000000`,
        "type":`0x0000000000000000`,
        "timeStamp":`0x${timestamp}`,
        "bodyHash":`0x${ygg.utils.bodyHashHex(body)}`,
        "bodyLength":`0x${ygg.utils.decimalToHex(body.length)}`
    }

    return header;
}

@Module({ namespacedPath: 'modules/yggdrash/', target: 'nuxt' })
export class YggdrashStore extends VuexModule {
    @getter transaction : Transaction | null = null;
    @getter keystoreData : any = null;
    @getter address : string | null = null;
    @getter network : string = '';
    @getter url : string = '';
    @getter currentActiveIndex : number = 0;
    @getter privateKey : string | null = null;
    @getter balance : string = "";
    @getter password : string | null = "";

    // related to modules
    @getter ygg : any = null;
    @getter intervalIds : number[] = []

    @mutation 
    public CLEAR_INTERVAL() {
        this.intervalIds = []
    }

    @mutation
    public APPEND_INTERVAL(intervalId: number) {
        this.intervalIds.push(intervalId);
    }

    @mutation
    public SET_CONNECTION(payload: any) {
        this.url = payload.url;
        this.currentActiveIndex = payload.activeIndex;
        this.network = payload.network;
    }

    @mutation
    public DISABLE_CONNECTION(payload: any) {
        this.transaction = null;
        this.keystoreData = null;
        this.privateKey = null;
        this.address = null;

        this.ygg = null;
    }

    @mutation
    public CREATE_ACCOUNT(payload: any) {
        this.address = payload.address;
        this.keystoreData = payload.keystoreData;
        this.privateKey = payload.privateKey;
    }

    @mutation
    public SET_BALANCE(payload: any) {
        this.balance = payload.balance;
    }

    @mutation
    public SIGN_IN(payload: any) {
        this.privateKey = payload.pk;
        this.address = payload.address.toLowerCase();
        this.password = payload.password;
    }

    @mutation
    public SET_TRANSACTION(payload: Transaction) {
        this.transaction = payload;
    }

    @mutation
    public SENT_TRANSACTION(payload: any) {
        this.transaction = {
            ...(this.transaction as Transaction),
            status: payload.status as boolean,
            txHash: payload.txHash as string,
        }
    }

    @mutation 
    public CREATE_WALLET(password: string) {

    }

    @action
    async createAccount( payload: any ) {
        const ygg = new yggjs.Ygg(new yggjs.Ygg.providers.HttpProvider(this.url))
        const password = payload.password;

        const { address, keystoreData } = ygg.wallet.create(password)

        const pk = ygg.utils.hexString(ygg.wallet.getPrivateKey(keystoreData, password))

        this.CREATE_ACCOUNT({
            address: address.toLowerCase(),
            privateKey: pk,
            keystoreData: keystoreData
        })
    }

    @action
    async getBalance() {
        const ygg = new yggjs.Ygg(new yggjs.Ygg.providers.HttpProvider(this.url))

        try {
            const address = `${(this.address as string).toLowerCase()}`;

            const balance = await ygg.client.getBalance(branchId, contractVersion, address).then((res: any) => res);
            this.SET_BALANCE({ balance: balance });
        } catch (err) {
            console.log(err);
        }
    }

    @action 
    async sendTransaction(payload : Transaction) {
        const ygg = new yggjs.Ygg(new yggjs.Ygg.providers.HttpProvider(this.url))

        const self = this;
        try {
            const pk = this.privateKey;
            const password = this.password;
            const wallet = ygg.wallet.import(pk, password)

            const toAddress = payload.to.toLowerCase();
            const amount = payload.amount;

            const body = ygg.client.transferBody(contractVersion, toAddress, amount)

            const txHeaders = txHeader(body, ygg);
            const tx = new ygg.tx(txHeaders);
            tx.sign(pk)

            const serialize = tx.serialize(body);

            const data : any = await ygg.client.sendTransaction(serialize);

            this.SENT_TRANSACTION({ ...data })
        } catch (err) {
            console.log(err)
        }
    }

    @action
    async signIn(payload: any) {
        const self = this;

        const ygg = new yggjs.Ygg(new yggjs.Ygg.providers.HttpProvider(this.url))

        let pk = ''
        let address = ''

        const password = payload.password

        try {
            if (payload.method === 'pk') {
                pk = payload.pk;
                const wallet = ygg.wallet.import(pk, password)
                address = wallet.address.toLowerCase();
                this.CREATE_ACCOUNT({
                    privateKey: pk, 
                    address: address,
                    keystoreData: wallet.keystoreData
                })
            } else {
                // sign in using keystoreData
                pk = ygg.utils.hexString(
                    ygg.wallet.getPrivateKey(payload.keystoreData, payload.password));
                address = payload.keystoreData.address.toLowerCase();        
            }

            this.SIGN_IN({ pk, address, password })
        } catch (err) {
            console.log(err)
        }
    }

    @action
    async clearInterval() {
        this.CLEAR_INTERVAL()
    }

    @action
    async appendInterval(payload: any) {
        this.APPEND_INTERVAL(payload.intervalId);
    }
}

export default YggdrashStore.ExtractVuexModule(YggdrashStore)
