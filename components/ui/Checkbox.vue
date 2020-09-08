<template>
    <div>
        <div class="checkbox-wrapper"
            :class='checkInputElementCssClass'
            @mouseover="mouseover = true"
            @mouseleave="mouseover = false" 
            @click="toggleValue" >
            <div class="vertical-align">
                <div>
                    <input type="checkbox" :checked="checked" />
                    <div class="mark">
                        <template v-if='checked'>
                            <img src="~/assets/icons/check_bold.svg"/>
                        </template>
                        <template v-else>
                            <template v-if='isSmall'>
                                <img src="~/assets/icons/check2_normal.svg">
                            </template>
                            <template v-else>
                                <img src="~/assets/icons/check1_normal.svg">
                            </template>
                        </template>
                        
                    </div>
                    <div class="label">{{ label }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    Component,
    Prop,
    Vue
} from "nuxt-property-decorator"

@Component({})
export default class Checkbox extends Vue {    
    @Prop(Boolean) public readonly value!: boolean
    @Prop(String) public readonly disabled!: string
    @Prop(String) public readonly small!: string
    @Prop(String) public readonly label!: string

    private checked : boolean = false;
    private onFocus : boolean = false;
    private mouseover : boolean = false;

    protected get checkInputElementCssClass() : any {
        return {
            'disabled': this.disabled !== undefined,
            'checked': this.checked,
            'mouseover': this.mouseover,
            'small': this.small !== undefined,
        };
    }
    
    private toggleValue() {
        this.checked = !this.checked
        this.$emit('input', this.checked);
    }

    private get isSmall() : boolean {
        return this.small !== undefined;
    }
}
</script>

<style lang="scss" src="@/assets/css/components/ui/Checkbox.scss" scoped>
</style>
