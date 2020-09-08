<template>
    <div>
        <content-wrapper>
            <template v-if="authenticated">
                <div id="yeed-faucet">
                    <div class="step-plate">Only for {{ currentNetwork }}</div>
                    <h1 class="header">YEED Faucet</h1>
                    <p class="description">The YEED Faucet runs on {{ currentNetwork }}</p><br/>

                    <h4 class="header">Account Address</h4>
                    <text-field disabled='disabled' :value="$store.state.modules.yggdrash.address"/> <br/>
                    <h4 class="header">YEED Balance</h4>
                    <number-field disabled='disabled' :value='$store.state.modules.yggdrash.balance'>
                        <template v-slot:rear-annotation>
                            <div>YEED</div>
                        </template>
                    </number-field>
                    <br><br>
                    <custom-button 
                        :onClick='driveRunFaucet'
                        :disabled='isLoading ? "disabled" : undefined'
                        is-primary-button>
                        <template v-if='!isLoading'>
                            Run Faucet
                        </template>
                        <template v-else>
                            <img width='30' src="~/assets/icons/loading.svg"/>
                        </template>
                    </custom-button>
                    <br><br><br><br><br><br><br><br><br><br>
                </div>
            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from "nuxt-property-decorator"
import VueRouter from "vue-router";

import axios from 'axios';

import { EventBus } from '~/lib/event-bus';

import ContentWrapper from '~/components/ContentWrapper.vue';

import TextField from '~/components/ui/TextField.vue';
import NumberField from '~/components/ui/NumberField.vue';
import CustomButton from '~/components/ui/Button.vue';

const yggjs = require('@yggdrash/sdk');

Component.registerHooks([
    'beforeRouteEnter'
])

@Component({
    components: {
        ContentWrapper,
        NumberField,
        TextField,
        CustomButton
    }
})
export default class YeedFaucet extends Vue {
    private authenticated: boolean = false;
    private isLoading: boolean = false;

    driveRunFaucet() {
        this.isLoading = true;
        window.setTimeout(this.runFaucet, 1000);
    }

    async mounted() {
        this.authenticated = !!this.$store.state.modules.yggdrash.address;

        if (this.authenticated) {
            const intervals = this.$store.state.modules.yggdrash.intervalIds;
            for(var i = 0; i < intervals.length; ++i) {
                window.clearInterval(intervals[i]);
            }

            await this.$store.dispatch('modules/yggdrash/clearInterval', {})

            await this.getBalance();
            const intervalId = window.setInterval(() => { 
                this.getBalance()
            }, 5000);

            await this.$store.dispatch('modules/yggdrash/appendInterval', { intervalId })
        }        
    }

    async destroyed() {
        const intervals = this.$store.state.modules.yggdrash.intervalIds;
        for(var i = 0; i < intervals.length; ++i) {
            window.clearInterval(intervals[i]);
        }

        await this.$store.dispatch('modules/yggdrash/clearInterval', {})
    }

    async getBalance() {
        await this.$store.dispatch('modules/yggdrash/getBalance', {});
    }

    beforeRouteEnter(from: VueRouter, to: VueRouter, next: any) {
        next( (component: YeedFaucet) => {
            if (!component.$store.state.modules.yggdrash.address) {
                component.$router.push('/access?next=faucet')
                return;
            }

            component.authenticated = true;
        })
    }

    private get currentNetwork() : string {
        return this.$store.state.modules.yggdrash.network;
    }

    private async runFaucet() {
        const ygg = new yggjs.Ygg(new yggjs.Ygg.providers.HttpProvider(this.$store.state.modules.yggdrash.url))
        const pk = this.$store.state.modules.yggdrash.privateKey

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

        const body = {  
            "contractVersion": contractVersion,
            "method":"faucet",
            "params": {}
        }

        const serializedBody = JSON.stringify(body);
        const txHeaders = txHeader(serializedBody, ygg);

        try {
            const tx = new ygg.tx(txHeaders)
            tx.sign(pk)
            let serialize = tx.serialize(serializedBody)

            const data : any = await ygg.client.sendTransaction(serialize).then((res: any) => res)

            EventBus.$emit('open-modal', { 
                component: 'faucet-modal',
                options: {
                    successed: data.status,
                    txHash: data.txHash
                }
            });

            await this.getBalance();
        } catch (err) {
            console.log(err);
        }

        this.isLoading = false;
    }
}
</script>

<style lang="scss" src="~/assets/css/pages/YeedFaucet.scss" scope>
</style>
