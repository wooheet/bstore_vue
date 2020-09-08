<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <transition name="modal-content" mode='out-in'>
                <div class="modal">
                    <slot></slot>
                </div>
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Prop
} from "nuxt-property-decorator";

@Component({})
export default class Modal extends Vue {
}
</script>

<style lang="scss" scoped>
.modal-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal {
    width: 500px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;

    overflow: hidden;
}

</style>
