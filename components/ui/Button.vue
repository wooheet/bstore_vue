<template>
    <button class="button" 
        :class='checkButtonType'
        :disabled='disabled'
        @click='onClick' >
        <slot>Submit</slot>
    </button>
</template>

<script lang="ts">
import {
    Component,
    Prop,
    Vue
} from "nuxt-property-decorator"

@Component({
    props: {
        hasGradation: String,
        small: String,
        disabled: String,
        
        isCreateAccount: String,
        isViewAccount: String,
        isSendToken: String,

        isPrimaryButton: String,
        isSecondaryButton: String,
        onClick: {
            type: Function,
            default: () => {}
        }
    }
})
export default class Button extends Vue {    
    private get checkButtonType() : any {
        return {
            'gradation-button': this.$props.hasGradation !== undefined,
            'small': this.$props.small !== undefined, 
            
            'create-account': this.$props.isCreateAccount !== undefined,
            'view-account': this.$props.isViewAccount !== undefined,
            'send-token': this.$props.isSendToken !== undefined,
            
            'primary-button': this.$props.isPrimaryButton !== undefined,
            'secondary-button': this.$props.isSecondaryButton !== undefined,
            'clear-button': !(this.$props.hasGradation !== undefined 
                                || this.$props.isPrimaryButton !== undefined
                                || this.$props.isSecondaryButton !== undefined)
        }
    }
}
</script>

<style lang="scss" src="@/assets/css/components/ui/Button.scss" scoped>
</style>
