<template>
    <div class="create-account-steps">
        <div class='step-plate'>STEP 3</div>
        <h1 class='header'>Please save your YGGDRASH Wallet key</h1>
        <div v-if="isVisible">
            <p>
            Your account has been successfully created.<br>
DO NOT forget to save both of the private key and YGGDRASH Wallet key.
            </p>
            <h4 class='header'>Private Key</h4>
            <copy-only-field encrypted :value='$store.state.modules.yggdrash.privateKey' />
            <h4 class='header'>YGGDRASH Wallet Key</h4>
            <copy-only-field encrypted :value='$store.state.modules.yggdrash.privateKey' />
            <div class="actions">
                <custom-button 
                    is-secondary-button
                    :onClick='() => $router.push("/access")'>View Account Info</custom-button>
                <div class="padding"></div>
                <custom-button 
                    is-primary-button
                    :onClick='() => $router.push("/transfer")'>Send YEED & Token</custom-button>
            </div>
        </div>
        <div justify-center align-center v-else>
            <img width="300" src="~/assets/icons/loading-dark.svg" />
        </div>
    </div>
</template>



<script lang="ts">
import {
    Component,
    Vue,
} from "nuxt-property-decorator"

import CopyOnlyField from '~/components/ui/CopyOnlyField.vue';
import CustomButton from '~/components/ui/Button.vue';

@Component({
    components: {
        CopyOnlyField,
        CustomButton
    }
})
export default class CreateAccountStep3 extends Vue {
    private isVisible : boolean = false;

    async mounted() {
        window.setTimeout(this.signIn, 1000);
    }

    async signIn() {
        await this.$store.dispatch('modules/yggdrash/signIn', {
            method: 'keystore',
            password: (this.$parent as any).password,
            keystoreData: (this.$parent as any).keystoreData
        })     

        this.isVisible = true;
    }
}
</script>

<style lang="scss" src="~/assets/css/pages/subpages/CreateAccountSteps.scss" scoped>
</style>
