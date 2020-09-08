<template>
    <div class='upload-field'>
        <input type="file" ref="upload" @change='fileUpload' hidden/>
        <field class="content" :placeholder='placeholder' v-model='filename' readOnly/>
        <div class="button-wrapper">
            <custom-button small :onClick='driveFileUpload'>UPLOAD</custom-button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from "nuxt-property-decorator"

import Field from '~/components/ui/TextField.vue'
import CustomButton from '~/components/ui/Button.vue'

@Component({
    extends: Field,
    components: {
        Field,
        CustomButton
    }    
})
export default class UploadField extends Field {
    private filename : string = ''
    private file! : File

    constructor() {
        super()
        this.inputType = 'text'
    }

    private driveFileUpload() {
        (this.$refs.upload as HTMLElement).click()
    }

    private fileUpload(event: any) {
        this.file = (event.target.files || event.dataTransfer.files)[0];
        this.filename = this.file.name

        const fileReader = new FileReader();

        fileReader.onload = (event: any) => {
            const data : string = event.target.result 
            this.$emit('input', data)
        }

        fileReader.readAsText(this.file);
    }
}
</script>

<style lang='scss' scoped>
    .upload-field {
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