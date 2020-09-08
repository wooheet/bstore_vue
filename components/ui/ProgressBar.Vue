<template>
    <div class="progress">
        <div class='step' 
            :key='index' v-for='(step, index) in stepArray'>
            <div class="step-circle"
                :class='{ progressed: currentStep >= index + 1 }'>
                {{ index + 1 }}
            </div>
            <div class="divider" 
                :class='{ remains: currentStep > index + 1 }' 
                v-show='index !== totalCount - 1'></div>
        </div>
    </div>
</template>

<script lang='ts'>
import {
    Component,
    Vue,
    Prop
} from "nuxt-property-decorator";

@Component({})
export default class ProgressBar extends Vue {
    @Prop({ type: String, default: '3' }) readonly totalCount! : string;
    @Prop({ type: String, default: '1' }) readonly currentStep! : string;

    private stepArray : any[] = new Array(parseInt(this.totalCount))
}
</script>

<style lang="scss" src="~/assets/css/components/ui/ProgressBar.scss" scoped >
</style>
