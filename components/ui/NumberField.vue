<script lang="ts">
import { Component } from "nuxt-property-decorator"

import Field from '~/components/ui/Field.vue'

@Component({
    extends: Field
})
export default class NumberField extends Field {
    constructor() {
        super()
        this.inputType = 'number';
        this.defaultPlaceholder = '0.0000000';
    }
}
</script>