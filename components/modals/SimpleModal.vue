<template>
    <modal>
        <h1>{{ title }}</h1>
        <div class="content">            
            <div v-html='content'></div>
        </div>
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
export default class SimpleModal extends Vue {
    @Prop(String) title!: string;
    @Prop(String) content!: string;
    
    private close() {
        this.$emit('close');
    }
}
</script>

<style>
.content {
    overflow: hidden;
}

.actions {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
</style>