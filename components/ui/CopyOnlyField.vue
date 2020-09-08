<template>
    <div class='copy-only-field'>
        <template v-if='encrypted !== undefined'>
            <password-field class="content" :value='value' disabled="disabled" />
        </template>
        <template v-else>
            <field class="content" :primary='primary !== undefined ? "primary" : undefined' :value='value' readOnly>
                <template v-slot:front-annotation>
                    <slot name='front-annotation'></slot>
                </template>
                <template v-slot:rear-annotation>
                    <slot name='rear-annotation'></slot>
                </template>
            </field>
        </template>
        <div class="button-wrapper">
            <custom-button small 
                v-clipboard:copy='value'
                v-clipboard:success='onCopy'>COPY</custom-button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from "nuxt-property-decorator"

import { EventBus } from '~/lib/event-bus'

import Field from '~/components/ui/Field.vue'
import PasswordField from '~/components/ui/PasswordField.vue'
import CustomButton from '~/components/ui/Button.vue'

@Component({
    extends: Field,
    components: {
        PasswordField,
        Field, 
        CustomButton
    }    
})
export default class CopyOnlyField extends Field {
    @Prop({ type: String, default: '' }) value!: string
    @Prop({ type: String }) encrypted!: string

    constructor() {
        super()
        this.inputType = 'text'
    }

    onCopy() {
        EventBus.$emit('open-modal', {
            component: 'simple-modal',
            options: {
                title: 'Success',
                content: `Copied value is ${this.value}`
            }
        })
    }
}
</script>

<style lang='scss' scoped>
    .copy-only-field {
        display: flex;

        .content {
            flex-basis: 100%;
            margin-right: 10px;
        }

        .button-wrapper {
            display: flex;
            align-items: center;
        }
    }
</style>