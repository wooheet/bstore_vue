<template>
    <div id="send-yeed-step-3">
        <h1 class="header">Transaction request  {{ transactionSuccessed ? "complete" : "Failed" }}</h1>
        <div v-if='transactionSuccessed'>
            <p>Your transaction transfer request has been successfully completed.<br>
            More information regarding the transaction can be found on YGGDRASH Explorer.</p>
        </div>
        <div v-else>
            <p>Your transaction request has failed. Please check the recipient's address again.</p>
        </div>
        <br><br>
        <div class="actions">
            <custom-button 
                is-secondary-button
                :onClick='sendAnotherToken'>
                Send Yeed & Token
            </custom-button>
            <custom-button 
                is-primary-button
                v-if='transactionSuccessed'
                :onClick='moveToTransactionPage'>
                View Transaction Info
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

import Transaction from '~/types/transaction'

import ContentWrapper from '~/components/ContentWrapper.vue';
import CustomButton from '~/components/ui/Button.vue';

@Component({
    components: {
        ContentWrapper,
        CustomButton
    }
})
export default class SendYeedStep3 extends Vue {
    @Prop( Object ) value!: Transaction;

    private get transactionSuccessed() : boolean {
        if (process.client) {
            return this.value.status;
        } else {
            return false;
        }
    }

    sendAnotherToken() {
        const transaction = { 
            ...this.$store.state.modules.yggdrash.transaction,
            amount: 0, 
            status: false,
            to: '' 
        };

        this.$emit('input', transaction);
        this.$emit('next')
    }

    moveToTransactionPage() {
        const url = `http://testnet.yggdrash.io/yggdrash/txs/${this.$store.state.modules.yggdrash.transaction.txHash}` 
        window.open(url)
    }
}
</script>

<style lang="scss" scoped>
    #send-yeed-step-3 {
        margin-top: 59px;
        width: 460px;
        margin-left: auto;
        margin-right: auto;

        .actions {
            display: flex;
            justify-content: space-between;

            * {
                width: 220px;
            }
        }
    }
</style>
