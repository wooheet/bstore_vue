<template>
    <content-wrapper>
        <template v-if='authenticated'>
            <component :is='whichStep()' v-model='transaction' @next='next()' @prev='prev()' />
        </template>
    </content-wrapper>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from "nuxt-property-decorator"
import VueRouter from "vue-router";

import Transaction from '~/types/transaction';

import ContentWrapper from '~/components/ContentWrapper.vue';

Component.registerHooks([
    'beforeRouteEnter'
])

@Component({
    components: {
        ContentWrapper,
        'send-yeed-step-1': () => import('~/pages/subpages/SendYeedStep1.vue'),
        'send-yeed-step-2': () => import('~/pages/subpages/SendYeedStep2.vue'),
        'send-yeed-step-3': () => import('~/pages/subpages/SendYeedStep3.vue')
    }
})
export default class SendYeed extends Vue {
    private authenticated : boolean = false;
    private step : number = 1;
    private transaction : Transaction = {
        status: false,
        txHash: '',
        from: this.$store.state.modules.yggdrash.address,
        to: '',
        unit: 'YEED',
        amount: 0.0,
        transactionFee: 0.0
    };

    beforeRouteEnter(from: VueRouter, to: VueRouter, next: any) {
        next( (component: SendYeed) => {
            if (!component.$store.state.modules.yggdrash.address) {
                component.$router.push('/access?next=transfer');
                return;
            }

            component.authenticated = true;
        })
    }

    async mounted() {
        this.transaction.from = this.$store.state.modules.yggdrash.address;
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

    private whichStep() : string {
        if (this.step === 2) {
            return 'send-yeed-step-2';
        }  else if (this.step === 3) {
            return 'send-yeed-step-3';
        } else {
            return 'send-yeed-step-1'
        }
    }
    private prev() {
        this.step -= 1;
    }

    private next() {
        this.step += 1;
        if (this.step > 3) {
            this.step = 1;
        } 
    }

}
</script>
