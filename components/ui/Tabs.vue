<template>
    <div class="tabs">
        <ul>
            <li v-for='(tab, index) in tabs'
                :key='normalize(tab.$attrs.title, index)'
                @click='toggleActive(index)'
                >
                {{ tab.$attrs.title }}
            </li>
        </ul>
        <div class="bottom-line" :style="{ 
            'width': bottomLineLength,
            'left': bottomLinePosition(currentActive) 
        }"></div>
        <div class='tabs-details'>
            <slot>
            </slot>
        </div>
    </div>
</template>
<script lang="ts">
import {
    Component,
    Vue,
    Prop
} from "nuxt-property-decorator";

import Tab from "~/components/ui/Tab.vue"; 

@Component({
    components: {
        Tab
    }
})
export default class Tabs extends Vue {
    private tabs : Tab[] = [];
    private tabCounts : number = 0;
    private currentActive : number = 0;

    private normalize(pattern: string, index: number) : string {
        return pattern.toLowerCase().split(' ').join('-') + '-' + index.toString();
    }

    private get bottomLineLength() : string {
        return (100 / this.tabCounts).toString() + '%';
    }

    private bottomLinePosition(index: number) : string {
        return (100 * index / this.tabCounts).toString() + '%';
    }

    private toggleActive(index: number) {
        this.flushAll()
        this.currentActive = index;
        this.tabs[this.currentActive].toggleActive();
    }

    private flushAll() {
        const self = this;
        for (let i = 0; i < self.tabCounts; ++i) {
            self.tabs[i].flush();
        }
    }

    created() {
        this.tabs = this.$children as Tab[];
    }

    mounted() {
        this.tabCounts = this.tabs.length;
        this.toggleActive(this.currentActive);
    }
}
</script>
<style lang="scss" scoped>
    .tabs {
        width: 100%;
        ul {
            width: 100%;
            margin: 0px;
            padding: 0px;

            border-bottom: 2px solid #ccc;
            display: flex;

            li {
                font-size: 14px;
                font-weight: bold;
                font-style: normal;
                font-stretch: normal;
                letter-spacing: normal;

                width: 100%;
                padding: 15px;
                
                text-align: center;
                list-style-type: none;
            }
        }

        .bottom-line {
            position: relative;
            top: 0px;
            border: 2px solid black;

            transition: all 0.5s ease-in-out;
        }
    }

</style>
