<template>
    <content-wrapper>
        <div id='create-account'>
            <div id='progress-bar-container'>
                <!-- <progress-bar :current-step='stepCount.toString()'/> -->
            </div>
            <div id='create-account-step-wrapper'>
                <component :is="whichStep()" 
                            @previous='previous' 
                            @next='next' />
            </div>
        </div>
    </content-wrapper>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Emit
} from "nuxt-property-decorator";

// import ProgressBar from '~/components/ui/ProgressBar.vue';
import ContentWrapper from '~/components/ContentWrapper.vue';

@Component({
    components: {
        ContentWrapper,
        // ProgressBar,
        'CreateAccountStep1': () => import('~/pages/subpages/CreateAccountStep1.vue'),
        'CreateAccountStep2': () => import('~/pages/subpages/CreateAccountStep2.vue'),
        'CreateAccountStep3': () => import('~/pages/subpages/CreateAccountStep3.vue'),
    }
})
export default class CreateAccount extends Vue {
    private stepCount : number = 1

    private password : string = '';
    private keystoreData : any;

    previous() {
        this.stepCount -= 1;
    }

    next() {
        this.stepCount += 1;
    }

    whichStep() {
        switch(this.stepCount) {
        case 1: 
            return 'CreateAccountStep1';
        case 2:
            return 'CreateAccountStep2';
        default:
            return 'CreateAccountStep3';
        }
    }
}
</script>

<style lang="scss" src="~/assets/css/pages/CreateAccount.scss" scoped>
</style>
