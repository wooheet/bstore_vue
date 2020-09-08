<template>
    <modal>
        <h1>{{ successed ? "YEED Faucet Successed" : "YEED Faucet Failed"}}</h1>
        <p v-if="successed">YEED will be delivered in 5 minutes <br><br/>
        Detail : <a :href="transactionURL" target="_blank">{{txHash}}</a> </p>
        <p v-else>
            You need to wait for 24 hours since last faucet request.<br>
        </p>
        <div class="actions">
            <div class="button">
                <custom-button 
                    is-primary-button 
                    :onClick='() => close()'>
                    Close
                </custom-button>
            </div>
        </div>
    </modal>
</template>

<script lang="ts">
import {
    Component,
    Prop,
    Vue
} from "nuxt-property-decorator"

import Modal from '~/components/modals/Modal.vue';
import CustomButton from '~/components/ui/Button.vue';

@Component({
    components: {
        CustomButton,
        Modal
    }
})
export default class FaucetModal extends Vue {
    @Prop(Boolean) successed!: boolean;
    @Prop(String) txHash!: string;

    private close() {
        this.$emit('close');
    }

    private get transactionURL(): string {
        return `http://testnet.yggdrash.io/yggdrash/txs/${this.txHash}`;
    }
}
</script>
