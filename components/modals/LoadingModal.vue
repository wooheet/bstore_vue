<template>
    <modal>
        <h1>{{ title }}</h1>
        <div class="loading-icon-wrapper">
            <img width="300" src="~/assets/icons/loading-animation.svg" />
        </div>
        <div class="content" v-html='content'></div>
    </modal>
</template>

<script lang="ts">
import {
    Component,
    Prop,
    Vue
} from "nuxt-property-decorator"

import Modal from '~/components/modals/Modal.vue';

@Component({
    components: {
        Modal
    }
})
export default class LoadingModal extends Vue {
    @Prop(String) title!: string;
    @Prop(String) content!: string;
}
</script>

<style lang="scss">
    h1 {
        text-align: center;
    }

    .loading-icon-wrapper {
        display: flex;
        justify-content: center;

    }
</style>