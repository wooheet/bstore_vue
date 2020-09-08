<template>
    <modal>
        <h4>Do you really want to clear your private key form your browser?</h4>
        <p>All information, including private key and token from your browser, will be deleted. This cannot be undone.</p>
        <checkbox v-model='checked' label='I agree to delete my TestNet YEED data.'/>
        <div class="actions">
            <div class="button">
                <custom-button 
                    is-secondary-button 
                    :onClick='() => $emit("close")'>
                    Cancel
                </custom-button>
            </div>
            <div class="button">
                <custom-button
                    is-primary-button
                    :onClick='clearPrivateKey'
                    :disabled='!checked ? "disabled" : undefined '>
                    Confirm
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
import Checkbox from '~/components/ui/Checkbox.vue';
import CustomButton from '~/components/ui/Button.vue';

@Component({
    components: {
        Checkbox,
        CustomButton,
        Modal
    }
})
export default class ClearPKModal extends Vue {
    private checked: boolean = false;

    private async clearPrivateKey() {
        const intervals = this.$store.state.modules.yggdrash.intervalIds;
        for(var i = 0; i < intervals.length; ++i) {
            window.clearInterval(intervals[i]);
        }

        await this.$store.dispatch('modules/yggdrash/clearInterval', {})

        this.$store.commit('modules/yggdrash/DISABLE_CONNECTION', {});
        this.$emit('close');
        this.$router.push('/')
    }
}
</script>

<style lang="scss" scoped>
.modal {
    .actions {
        display: flex;
        margin-top: 30px;
        justify-content: center; 

        .button {
            width: 140px;
            margin-right: 20px;
        }
    }
}
</style>
