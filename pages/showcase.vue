<template>
    <div>
        <h1 class="header">SHOW CASE</h1>
        <h2 class="header">가나다라마바사</h2>
        <h3 class="header">가나다라마바사</h3>
        <h4 class="header">가나다라마바사</h4>
        <h5 class="header">가나다라마바사</h5>
        <h6 class="header">가나다라마바사</h6>

        <hr>
        <h1 class="header">Buttons</h1>

        <custom-button has-gradation is-create-account>Create Account</custom-button>
        <custom-button has-gradation is-view-account>Create Account</custom-button>
        <custom-button has-gradation is-send-token>Create Account</custom-button>
        <custom-button is-primary-button>Create Account</custom-button>
        <custom-button is-secondary-button>Create Account</custom-button>
        <custom-button>Create Account</custom-button>

        <h1 class="header">Input</h1>
        
        <div class="fields-wrapper">
            <text-field primary v-model='message'/><br><br>
            <text-field value='비활성화된 입력입니다.' disabled="disabled"/><br><br>
            <number-field v-model="accountNumber"/><br>
            <number-field value='1.00000'>
                <template v-slot:rear-annotation>
                    <div>YEED</div>
                </template>
            </number-field>
            <br>
            <password-field v-model='customPassword' :error='message' validatable="validatable"/><br>
            <upload-field primary v-model='fileContent'/>
            <br>
            <copy-only-field primary value='1A2BBB444331122'>
                <template v-slot:front-annotation>
                    <div>Hex</div>
                </template>
            </copy-only-field>

            <checkbox v-model='checked' label='asdsadasdasdasdas'/>
            <checkbox small v-model='checked_1' label='asdasdsaasdasdasdsadasdasdas'/>
        </div>
        <br>
        <br>
        <br>
        <br>

        <h1 class="header">Tabs</h1>

        <tabs>
            <tab title='Sign-in using private Key'>
            adssadsadasdasda
            </tab>
            <tab title='Sign-in using GPG Key'>
            asdasdsadasdasdasdasdsa
            </tab>
        </tabs>

        <h1 class="header">Progress</h1>
        <!-- <progress-bar/>
        <br>
        <progress-bar current-step='2'/>
        <br>
        <br>
        <progress-bar current-step='3'/>
        <br>


        <progress-bar current-step='3' total-count='5'/> --> 

        
        <br>
        <br>

        <h1 class="header">DropDown</h1>


        <h1 class="header">Step Plate</h1>
        <br>
        <div class="step-plate">STEP 1</div>
        <div class="step-plate">STEP 2</div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
    </div>
</template>
<script lang="ts">
import {
    Component,
    Vue
} from "nuxt-property-decorator";

import CustomButton from "~/components/ui/Button.vue"; 

import TextField from "~/components/ui/TextField.vue"; 
import NumberField from "~/components/ui/NumberField.vue";
import PasswordField from "~/components/ui/PasswordField.vue";
import UploadField from "~/components/ui/UploadField.vue";
import CopyOnlyField from "~/components/ui/CopyOnlyField.vue";

//import ProgressBar from '~/components/ui/ProgressBar.vue';
import Checkbox from '~/components/ui/Checkbox.vue';

import Tabs from "~/components/ui/Tabs.vue"; 
import Tab from "~/components/ui/Tab.vue"; 

@Component({
    components: {
        CustomButton,
        TextField,
        NumberField,
        PasswordField,
        UploadField,
        CopyOnlyField,        
//        ProgressBar,
        Tabs,
        Tab,
        Checkbox
    },
})
export default class UIShowcase extends Vue {
    private budget : number = 0;
    private customPassword : string = "asdasd";
    private message : string = "asddddasdasd";
    private comment : string = "";
    private fileContent : string = "";
    private accountNumber : string = '1.000';
    private checked : boolean = false;
    private checked_1 : boolean = false;

    mounted() {
    }
}
</script>

<style scoped>
    .fields-wrapper {
        width: 510px;
    }
</style>
