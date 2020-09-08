<template>
    <div class="drop-down-box" >
        <div @click="toggleMode">
            <slot name='trigger'></slot>
        </div>
        <ul :class="{ active: isActive }" @click="toggleMode">
            <slot name="selections"></slot>
        </ul>
    </div>
</template>

<script lang='ts'>
import {
    Component,
    Vue,
    Prop
} from "nuxt-property-decorator";

@Component({})
export default class DropDownBox extends Vue {
    private isActive : boolean = false;
    
    private toggleMode() {
        this.isActive = !this.isActive;
    }

}
</script>

<style lang="scss" src="~/assets/css/components/ui/DropDownBox.scss" scoped >
</style>
