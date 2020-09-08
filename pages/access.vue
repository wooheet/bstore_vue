<template>
    <div>
        <content-wrapper>
            <component :is='whichStep()' @next='next()' />
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from "nuxt-property-decorator"

import ContentWrapper from '~/components/ContentWrapper.vue';

import SignIn from '~/pages/subpages/SignIn.vue';
import MyAccountInfo from '~/pages/subpages/MyAccountInfo.vue'

@Component({
    components: {
        ContentWrapper,
        SignIn,
        MyAccountInfo
    }
})
export default class ViewAccount extends Vue {
    private currentStep : string = 'signIn';

    async mounted() {
        if(!this.$store.state.modules.yggdrash.address)
            return;
    }

    next() {
        const tokens = location.href.split('?');
        if (tokens.length <= 1) {
            this.currentStep = "myAccountInfo"
        } else {
            const nextPath = '/' + tokens[tokens.length-1].split('=')[1]
            this.$router.push(nextPath);
        }
    }

    private whichStep() : string {
        if (this.$store.state.modules.yggdrash.privateKey)
            return 'MyAccountInfo';

        if (this.currentStep === 'signIn') {
            return 'SignIn';
        } else {
            return 'MyAccountInfo';
        }
    }
    
}
</script>
