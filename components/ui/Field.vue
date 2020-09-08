<template>
    <div>
        <div class="field-wrapper"
            :class='checkInputElementCssClass'>
            <div class="vertical-align">
                <div class="front-annotation" v-if='!!$slots["front-annotation"]'>
                    <slot name='front-annotation' ></slot>
                </div>
                <div class='field'>
                    <input v-model='handleValue'
                        :disabled='disabled || readOnly' 
                        :type='whichType'
                        :placeholder='customPlaceholder'
                        @focusin='onFocus = true' 
                        @focusout='onFocus = false'/>
                </div>
                <div class="rear-annotation" v-if='!!$slots["rear-annotation"]' >
                    <slot  name='rear-annotation' ></slot>
                </div>                
            </div>
        </div>
        <template v-if="validatable !== undefined">
            <div class="error-wrapper">
                <div v-if="!!error">
                    <img src="~/assets/icons/warning_icon.svg" /> {{ error }}
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import {
    Component,
    Prop,
    Vue,
    Watch
} from "nuxt-property-decorator"

import { VNodeDirective, VNode } from "vue";

@Component({})
export default class Field extends Vue {    
    @Prop(String) public readonly value!: string
    @Prop(String) public readonly disabled!: string
    @Prop(String) public readonly readOnly!: string
    @Prop({ type: String, default: '' }) public readonly nextType!: string
    @Prop(String) public readonly placeholder!: string
    @Prop(String) public readonly primary!: string

    @Prop(String) public readonly validatable!: string
    @Prop(String) public readonly error!: string

    public localValue : string = this.value;
    private onFocus : boolean = false;

    protected inputType : string = this.nextType; 
    protected defaultPlaceholder : string = '';

    @Watch('value')
    onValueChanged(value: string, oldValue: string) {
        this.localValue = value;
    }

    protected get checkInputElementCssClass() : any {
        return {
            'primary': this.primary !== undefined,
            'disabled': this.disabled !== undefined,
            'focused': this.onFocus,
            'error': !!this.error,
        };
    }

    protected get customPlaceholder() : string {
        return this.$props.placeholder || this.defaultPlaceholder;
    }
    
    protected get handleValue() : string {
        return this.localValue;
    }

    protected set handleValue(value: string) {
        this.localValue = value;
        this.$emit('input', value)
    }

    protected get whichType() {
        if (this.nextType !== '')
            return this.nextType;
        else
            return this.inputType;
    }
}
</script>

<style lang="scss" src="@/assets/css/components/ui/Field.scss" scoped>
</style>
