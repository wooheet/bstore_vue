<template>
    <div class='password-field'>
        <field :value='value' 
                :disabled='disabled' 
                :nextType='inputType'
                :placeholder='placeholder'
                :error='error'
                primary
                @input='emitToParent'>
            <template v-slot:rear-annotation>
                <div class='toggle-button' @click='toggleVisibility'>
                    <img src="~/assets/icons/password_eye_icon.svg" v-if='inputType==="password"'/>
                    <img src="~/assets/icons/password_eye_icon_2.svg" v-else />
                </div>
            </template>
        </field>
    </div>
</template>

<script lang="ts">
import { Component } from "nuxt-property-decorator"

import Field from '~/components/ui/Field.vue';

@Component({
    extends: Field,
    components: {
        Field
    }
})
export default class PasswordField extends Field {
    constructor() {
        super()
        this.inputType = 'password';
    }

    private toggleVisibility() {
        if (this.inputType === 'password')
            this.inputType = 'text';
        else
            this.inputType = 'password';
    }

    private emitToParent(value: string) {
        this.$emit('input', value);
    }
}
</script>

<style scoped>
    .toggle-button {
        display:flex;
        align-items: center;

        height: 100%;
        padding: 0px 10px;
    }
</style>