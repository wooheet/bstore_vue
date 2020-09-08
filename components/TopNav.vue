<template>
    <div id="top-nav">
        <template v-if="$store.state.modules.yggdrash.address">
            <custom-button :onClick="showModal"><img src='~/assets/icons/clear_icon.svg'/>Clear Private key</custom-button>
        </template>
        <div id="padding"></div>
        <div id="drop-down-box-wrapper">
            <drop-down-box>
                <template v-slot:trigger>
                    <custom-button><img src="~/assets/icons/net_icon.svg"> {{ currentNetwork }}</custom-button>
                </template>
                <template v-slot:selections>
                    <li 
                        :class='{ active: activeIndex === index }' 
                        :key='index' 
                        v-for='(network, index) in networks'
                        @click='changeNetwork(index)' >
                        {{ network[0] }}
                    </li>
                </template>
            </drop-down-box>
        </div>
    </div>
</template>
<script lang="ts">
import {
    Component,
    Vue
} from "nuxt-property-decorator"

import { EventBus } from '~/lib/event-bus';

import CustomButton from "~/components/ui/Button.vue";
import DropDownBox from "~/components/ui/DropDownBox.vue";

@Component({
    components: {
        CustomButton,
        DropDownBox,
    }
})
export default class TopNav extends Vue {
    private networks : [string, string][] = [
        ['YEED Testnet', 'http://testnode.yggdrash.io'],
        ['Main Network', 'http://testnode.yggdrash.io']
    ]

    private get currentNetwork() {
        return this.$store.state.modules.yggdrash.network;
    }

    private get activeIndex() {
        return this.$store.state.modules.yggdrash.currentActiveIndex;
    }

    private async changeNetwork(index: number) {
        const [name, url] = this.networks[index];
        
        this.$store.commit('modules/yggdrash/SET_CONNECTION', {
            network: name,
            url: url,
            activeIndex: index
        })

        const intervals = this.$store.state.modules.yggdrash.intervalIds;
        for(var i = 0; i < intervals.length; ++i) {
            window.clearInterval(intervals[i]);
        }
        
        await this.$store.dispatch('modules/yggdrash/clearInterval', {})

        this.$router.push('/')
    }

    private showModal() {
        EventBus.$emit('open-modal', { 
            component: 'clear-pk-modal',
            options: {}
        });
    }
}
</script>
<style lang="scss" scoped>
    #top-nav {
        display: flex;
        margin-right: 70px;
        justify-content: flex-end;

        #padding {
            flex-basis: 20px;
        }

        #drop-down-box-wrapper {
            width: 151px;
        }
    }
</style>
