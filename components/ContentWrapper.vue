<template>
    <div id="content-wrapper">  
        <div class="header">
            <top-nav />
        </div>
        <div class="section">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from "nuxt-property-decorator"

import TopNav from '~/components/TopNav.vue';

@Component({
    components: {
        TopNav
    }
})
export default class ContentWrapper extends Vue {

}
</script>
<style lang="scss" scoped>
    #content-wrapper {
        padding: 20px;
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;
    }
</style>
