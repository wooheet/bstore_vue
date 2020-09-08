<template>
    <div class="tab" v-if='isActive'>
        <slot>
        </slot>
    </div>
</template>
<script lang="ts">
import {
    Component,
    Vue,
    Prop
} from "nuxt-property-decorator";


@Component({

})
export default class Tab extends Vue {
    private isActive: boolean = false;

    public toggleActive() {
        this.isActive = !this.isActive;
    }

    public flush() {
        this.isActive = false;
    }
}
</script>
<style lang="scss" scoped>
    .tab {
        padding-top: 29px;
    }
</style>
