<template>
    <div class="create-account-steps">
        <div class='step-plate'>STEP 1</div>
        <h1 class='header'>Please Set the Password to Download Your Keystore File</h1>
        <p>
            This is the first step to create your YGGDRASH account.<br>
Please set the password to download the Keystore file. Keystore is password encrypted private key that is in text format or in a file, which contains an address and parameters related to cryptographic operations.

        </p>

        <h4 class='header'>Password</h4>

        <div>
            <popper trigger="click" :options="{placement: 'top'}">
                <div class="popper">
                    <ul>
                        <li 
                            :key='index'
                            :class="{ valid: validation.isValid}" 
                            v-for='(validation, index) in validations'>
                            {{ status(validation.isValid) }} &nbsp;&nbsp; {{ validation.message }}    
                        </li>
                    </ul>
                </div>

                <div style="width: 100%;" ref="popper" href="#" slot="reference"></div>
            </popper>
        </div>

        <PasswordField v-model='password' />

        <br>
        <p class="caution">
            <img src="~/assets/icons/warning_icon.svg" /> YGGDRASH Wallet will be used only for developmental purpose. TestNet YEED has no financial value.
        </p>
        <br>

        <custom-button 
            :onClick='requestCreateAccount' 
            :disabled='(isLoading || password.length == 0) ? "disabled" : undefined '
            is-primary-button>
            <template v-if='!isLoading'>
                Download & Next Step
            </template>
            <template v-else>
                <img width='30' src="~/assets/icons/loading.svg"/>
            </template>
        </custom-button>
    </div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
} from "nuxt-property-decorator"

import CustomButton from '~/components/ui/Button.vue'
import PasswordField from '~/components/ui/PasswordField.vue'

import 'vue-popperjs/dist/vue-popper.css';

export interface Validation {
    isValid: boolean;
    message: string;
}

@Component({
    components: {
        CustomButton,
        PasswordField,
        'popper': require('vue-popperjs')
    }
})
export default class CreateAccountStep1 extends Vue {
    private password : string = ''
    private validations : Validation[] = []
    private isPasswordValid : boolean = true;
    private isLoading : boolean = false;

    private checkIfValid(password: string) : Validation[] {
        let validations : Validation[] = []
        
        let lengthIsValid = true; 
        if (this.password.length < 12 || this.password.length > 32) {
            lengthIsValid = false;
        }

        validations.push({
            isValid: lengthIsValid,
            message: 'The length of password should be in 12 .. 32.'
        })

        let formatIsValid = true;

        if (!/(.*[A-Z].*)/.test(password)) {
            formatIsValid = false;
        }

        if (!/(.*[a-z].*)/.test(password)) {
            formatIsValid = false;
        }

        if (!/(.*[0-9].*)/.test(password)) {
            formatIsValid = false;
        }

        if (!/(.*[\\x21-\\x2F\\x3A-\\x40\\x5B-\\x60\\x7B-\\x7E].*$)/.test(password)) {
            formatIsValid = false;
        }

        validations.push({
            isValid: formatIsValid,
            message: 'more than 1 character for each digits, lower case, upper case, special character'
        })

        let includesValidCharacter = true;
        if (!/[A-Za-z0-9\\x21-\\x2F\\x3A-\\x40\\x5B-\\x60\\x7B-\\x7E]+/.test(password)) {
            includesValidCharacter = false;
        }

        validations.push({
            isValid: includesValidCharacter,
            message: 'You should use valid character'
        })

        return validations;
    }

    private status(isValid: boolean) : string {
        return isValid ? '✓' : '✕';
    }

    requestCreateAccount() {
        this.isLoading = true;
        window.setTimeout(this.next, 1000);
    }

    async next() {
        this.validations = this.checkIfValid(this.password)

        this.isPasswordValid = 
            this.validations
                .map((validation: Validation) => validation.isValid)
                .reduce((acc: boolean, item: boolean) => acc && item)

        if(this.isPasswordValid) {
            await this.$store.dispatch('modules/yggdrash/createAccount', {
                password: this.password
            })
            const parent : any = this.$parent;
            parent.password = this.password;
            parent.keystoreData = this.$store.state.modules.yggdrash.keystoreData;
            this.$emit('next')
        } else {
            (this.$refs.popper as HTMLElement).click()
        }

        this.isLoading = false;
    }
}
</script>

<style lang="scss" src="~/assets/css/pages/subpages/CreateAccountSteps.scss" scoped>
</style>
