<template>
    <div id="send-yeed-step-1">
        <div id="select-token">
            <h1 class="header">Select Token</h1>
            <p class="caution">
                <img src="~/assets/icons/warning_icon.svg" /> YGGDRASH Wallet will be used only for the developmental purpose. TestNet YEED has no financial value.
            </p>
            <div class="tokens">
                <div class="token">
                    <div class="token-label">● YEED</div>
                    <div class="value">
                        {{ this.$store.state.modules.yggdrash.balance }}
                    </div>
                </div>
            </div>
        </div>
        <div id="enter-information">
            <h1 class="header">Enter Information</h1>
            <br>
            <h4 class="header">From Address</h4>
            <text-field :value="fromAddress" disabled="disabled" />
            <h4 class="header">To Address</h4>
            <text-field v-model="toAddress" validatable='validatable' :error='addressError'/>
            <h4 class="header">Amount to send</h4>
            <number-field v-model="amount" validatable='validatable' :error='amountError' >
                <template v-slot:rear-annotation>
                    <div>
                        YEED
                    </div>
                </template>
            </number-field>
            <br/>
            <div id="transaction-fee">
                <div id="label">
                    <div>
                        <h4 class="header">Transaction Fee</h4>
                    </div>
                    <div>
                        
                    </div>
                </div>
                <div id="result">
                    <div id="amount">
                        <div>
                            <h1 class="header">
                                {{ transactionFee.toPrecision(7) }}
                            </h1>
                        </div>
                    </div>
                    <div id="unit">
                        <div>
                            {{ unit }}
                        </div>
                    </div>
                </div>
            </div>
            <br/><br/><br/>
            <div>
                <custom-button is-primary-button :onClick='next' :disabled="emptyCheck()">Send Transcation</custom-button>
            </div>
        </div>           
    </div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Prop
} from "nuxt-property-decorator"

import axios from '~/lib/axios';

import { EventBus } from '~/lib/event-bus';

import Transaction from '~/types/transaction';

import ContentWrapper from '~/components/ContentWrapper.vue';
import TextField from '~/components/ui/TextField.vue';
import NumberField from '~/components/ui/NumberField.vue';
import CustomButton from '~/components/ui/Button.vue';


const yggjs = require('@yggdrash/sdk');

@Component({
    components: {
        ContentWrapper,
        TextField,
        NumberField,
        CustomButton
    }
})
export default class SendYeedStep1 extends Vue {
    @Prop(Object) value! : Transaction;

    private fee : number = 0;

    private amount : string = '';
    private fromAddress : string = '';
    private toAddress : string = '';
    private unit : string = "YEED";

    private amountError : string = '';
    private addressError : string = '';

    mounted() {
        this.fromAddress = this.value.from;
        this.toAddress = this.value.to;
        this.amount = this.value.amount.toString();
    }

    private get transactionFee() : number {
        return this.fee;
    }

    private emptyCheck() : string | undefined {
        if ( // this.fromAddress === undefined 
                this.toAddress.length === 0 
                || this.unit.length === 0
                || Number.parseFloat(this.amount) === 0 )
            return "disabled";
        else
            return undefined;
    }

    async next() {
        const ygg = new yggjs.Ygg(new yggjs.Ygg.providers.HttpProvider(this.$store.state.modules.yggdrash.url))

        const self = this;
        const isValid = ygg.utils.isAddress(this.toAddress);

        this.amountError = '';
        this.addressError = '';

        if (!isValid) {
            this.addressError = 'Input Address is invalid. Please try again'
        }

        const transaction : Transaction = {
            txHash: '',
            status: false,
            amount: Number.parseFloat(this.amount),
            from: this.fromAddress,
            to: this.toAddress,
            unit: this.unit,
            transactionFee: this.transactionFee
        }

        // 음수 amount
        if (transaction.amount < 0) {
            this.amountError = 'amount cannot be minus.';
            return;
        }

        // balance가 0
        if (Number.parseFloat(this.$store.state.modules.yggdrash.balance) === 0.0 ) {
            this.amountError = 'your balance is empty.';
            return;
        }

        // balance가 fee 보다 적음 
        if (Number.parseFloat(this.$store.state.modules.yggdrash.balance) < this.fee ) {
            this.amountError = 'Your balance is smaller than transaction fee.'
            return;
        }

        // amount + fee가 balance보다 큼
        if (transaction.amount + this.fee > Number.parseFloat(this.$store.state.modules.yggdrash.balance)) {
            this.amountError = 'Your balance has insufficient balance. Please try again with a different amount.'
            return;
        }

        
        
        // 유효하지 않은 주소
        if (isValid) {
            this.$store.commit('modules/yggdrash/SET_TRANSACTION', transaction);
            this.$emit('input', transaction);
            this.$emit('next')
        }
    }

    get balance() {
        return this.$store.state.modules.yggdrash.balance;
    }
}
</script>

<style lang="scss" src="~/assets/css/pages/subpages/SendYeedStep1.scss" scoped>
</style>
