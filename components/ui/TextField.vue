<script lang="ts">
import Vue from 'vue';
import { Component } from "nuxt-property-decorator"

import Field from '~/components/ui/Field.vue'

@Component({
    extends: Field
})
export default class TextField extends Field {
    constructor() {
        super()
        this.inputType = 'text';
    }
}
</script>