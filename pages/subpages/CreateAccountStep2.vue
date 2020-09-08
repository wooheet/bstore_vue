<template>
    <div class="create-account-steps">
        <div class='step-plate'>STEP 2</div>
        <h1 class='header'>Please download Keystore file</h1>
        <p>
            This is the first step to create your YGGDRASH account.<br>
Please set the password to download your Keystore file. Keystore is password encrypted Private Key that is in text format or in a file, which contains an address and parameters related to cryptographic operations.

        </p>
        <custom-button is-primary-button :onClick='next'>
            <a ref="download" id="download-button" style="display:none" :href="convertedData" download="keystore.json"></a>
            Download & Next Step
        </custom-button>
    </div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
} from "nuxt-property-decorator"

import CustomButton from '~/components/ui/Button.vue'

@Component({
    components: {
        CustomButton
    }
})
export default class CreateAccountStep2 extends Vue {
    async mounted() {
        await this.$store.commit('modules/yggdrash/DISABLE_CONNECTION', {})
    }

    get convertedData() {
        if (process.client) {
            const contentType = 'application/json'
            const dData = JSON.stringify((this.$parent as any).keystoreData , null, 2)
            const blob = new Blob([dData], { type: contentType })
            const url = window.URL.createObjectURL(blob)

            return url
        } else {
            return null
        }
    }

    next() {
        (this.$refs.download as HTMLElement).click()
        this.$emit('next')
    }
}
</script>

<style lang="scss" src="~/assets/css/pages/subpages/CreateAccountSteps.scss" scoped>
</style>
