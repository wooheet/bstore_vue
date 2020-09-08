<template>
    <transition name="modal-fade">
        <div class="modals-container" v-if="isVisible">
            <component :is="component" @close='closeModal()' v-bind='options' :visible='isVisible'>
            </component>
        </div>
    </transition>
</template>

<script lang="ts">
import {
    Component,
    Prop,
    Vue
} from "nuxt-property-decorator"

import { EventBus } from '~/lib/event-bus';

@Component({
    components: { 
        'empty-modal': () => import('~/components/modals/EmptyModal.vue'),
        'clear-pk-modal': () => import('~/components/modals/ClearPKModal.vue'),
        'faucet-modal': () => import('~/components/modals/FaucetModal.vue'),
        'simple-modal': () => import('~/components/modals/SimpleModal.vue'),
        'loading-modal': () => import('~/components/modals/LoadingModal.vue')
    }
})
export default class ModalsContainer extends Vue {
    private component: string = 'empty-modal';
    private options: any = {};
    private isVisible: boolean = false;

    private openModal(modalOptions: any) {
        this.component = modalOptions.component;
        this.options = modalOptions.options;
        this.isVisible = true;
    }

    private closeModal() {
        this.isVisible = false;
    }

    created() {
        EventBus.$on('open-modal', this.openModal);
        EventBus.$on('close-modal', this.closeModal);
    }

    destroyed() {
        EventBus.$off('open-modal', this.openModal);
        EventBus.$off('close-modal', this.closeModal);
    }
}
</script>

<style lang='scss' scoped>
.modals-container {
    position: absolute;
    width: calc(100% - 240px);
    height: 100%;
    z-index: 9999
}

.modal-fade-enter-active {
    transition: all 0.4s ease;
}

.modal-fade-leave-active {
    transition: all 0.4s ease;
}

.modal-fade-enter, .modal-fade-leave-to {
    opacity: 0;
}
</style>
