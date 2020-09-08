<template>
    <div id="send-yeed-step-2">
        <h1 class="header">Total</h1>
        <div id="total-wrapper">
            <div class="total">
                <div>
                    <div class="amount">{{ amount }}</div>
                    <div class="unit">YEED</div>
                </div>
                <div class="transaction-fee">
                    <div>Tranasction fee</div>
                    <div><b>{{ transactionFee }}</b> {{ unit }}</div>
                </div>
            </div>
            <div class="transaction">
                <div class="field">
                    <div class="key">From</div>
                    <div class="value">{{ from }}</div>
                </div>
                <div class="field">
                    <div class="key">To</div>
                    <div class="value"> {{ to }}</div>
                </div>
                <div class="field">
                    <div class="key">Amount</div>
                    <div class="value">{{ amount }} {{ unit }}</div>
                </div>
            </div>
        </div>
        <div class="description">
            <h4 class="header">Are you sure you want to proceed?</h4>
            <p class="caution">
                <img src="~/assets/icons/warning_icon.svg" /> YGGDRASH Wallet is not responsible for any loss due to token transaction errors and operational mistakes. Are you sure you want to proceed with this transaction?
            </p>
        </div>
        <br>
        <br>
        <br>
        <div class="actions">
            <custom-button is-secondary-button :onClick='prev'>No</custom-button>
            <custom-button 
                :onClick='driveNext'
                :disabled='isLoading ? "disabled" : undefined'
                is-primary-button>
                <template v-if='!isLoading'>
                    Yes
                </template>
                <template v-else>
                    <img width='30' src="~/assets/icons/loading.svg"/>
                </template>
            </custom-button>
        </div>
    </div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Prop
} from "nuxt-property-decorator"

import Transaction from '~/types/transaction';

import ContentWrapper from '~/components/ContentWrapper.vue';
import CustomButton from '~/components/ui/Button.vue';

@Component({
    components: {
        ContentWrapper,
        CustomButton
    }
})
export default class SendYeedStep2 extends Vue {
    @Prop(Object) value! : Transaction;
    private isLoading: boolean = false;

    private get amount() : number {
        if (process.client) {
            return this.value.amount;
        } else {
            return 0;
        }
    }

    private get transactionFee() : number {
        if (process.client) {
            return this.value.transactionFee;
        } else {
            return 0;
        }
    }

    private get from() : string {
        if (process.client) {
            return this.value.from;
        } else {
            return "";
        }
    }

    private get to() : string {
        if (process.client) {
            return this.value.to;
        } else {
            return "";
        }
    }

    private get unit() : string {
        if (process.client) {
            return this.value.unit;
        } else {
            return "YEED";
        }
    }

    async prev() {
        this.$emit('prev')
    }

    driveNext() {
        this.isLoading = true; 
        window.setTimeout(this.next, 1000);
    }

    async next() {
        await this.$store.dispatch('modules/yggdrash/sendTransaction', this.value);
        await this.$store.dispatch('modules/yggdrash/getBalance', {});
        this.$emit('input', this.$store.state.modules.yggdrash.transaction)
        this.$emit('next')
    }
}
</script>

<style lang="scss" src="~/assets/css/pages/subpages/SendYeedStep2.scss" scoped>
</style>
