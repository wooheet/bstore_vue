
<template>
    <div id="sign-in">
        <h1 class="header">Access Your account</h1>
        <tabs>

            <tab title="Sign In with Private Key">
                <p>You can access your TestNet account using YGGDRASH Wallet key or private key. You can also use your Keystore file and password.</p>
                <h4 class="header">YGGDRASH Wallet key or Private key</h4>
                <password-field 
                    v-model='privateKey'
                    placeholder='Enter the YGGDRASH wallet key or private key' />
                <br/>
                <h4 class="header">Password</h4>
                <password-field 
                    v-model='passwordForPrivateKey'
                    placeholder='Enter the YGGDRASH wallet key or private key' />
                <checkbox small v-model='agreement1' label="YGGDRASH Wallet will be used only for the developmental purpose. TestNet YEED has no financial value." />
                <br>
                <br>

                <template v-if='!isLoading'>
                    <custom-button 
                    :onClick='sign("pk")' 
                    :disabled='checkConditionForPrivateKeyLogin'
                    is-primary-button>               
                        Next Step
                    </custom-button>
                </template> 
                <template v-else>
                    <custom-button disabled is-primary-button>                                   
                        <img width='30' src="~/assets/icons/loading.svg"/>
                    </custom-button>
                </template>  
                
            </tab>
            <tab title="Sign In with Keystore File">
                <p>Your Keystore file stores your private key and account address. You can sign in using Keystore file and password.</p>
                <h4 class="header">Import Keystore file (.json)</h4>
                <upload-field placeholder="Search" v-model="keystoreData" />

                <h4 class="header">Password</h4>
                <password-field 
                    placeholder='Enter the password' 
                    v-model='passwordForKeystoreFile' />
                <br/>
                <checkbox small v-model='agreement2' label="YGGDRASH Wallet will be used only for the developmental purpose. TestNet YEED has no financial value." />
                <br>
                <br>

                <custom-button 
                    :onClick='sign("keystore")' 
                    :disabled='checkConditionForKeystoreLogin || isLoading'
                    is-primary-button>
                    <template v-if='!isLoading'>
                        Next Step
                    </template>
                    <template v-else>
                        <img width='30' src="~/assets/icons/loading.svg"/>
                    </template>
                </custom-button>

            </tab>
        </tabs>
    </div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Provide
} from "nuxt-property-decorator"

import Tab from '~/components/ui/Tab.vue';
import Tabs from '~/components/ui/Tabs.vue';

import { EventBus } from '~/lib/event-bus';

import PasswordField from '~/components/ui/PasswordField.vue';
import UploadField from '~/components/ui/UploadField.vue';
import CustomButton from '~/components/ui/Button.vue';
import Checkbox from '~/components/ui/Checkbox.vue';

const yggjs = require('@yggdrash/sdk');

@Component({
    components: {
        Tabs,
        Tab,
        PasswordField,
        CustomButton,
        UploadField,
        Checkbox
    }
})
export default class SignIn extends Vue {
    private privateKey : string = '';

    private passwordForPrivateKey : string = '';
    private passwordForKeystoreFile : string = '';

    private keystoreData : string = '';

    private agreement1: boolean = false;
    private agreement2: boolean = false;

    private isLoading: boolean = false;

    private sign(type: string) {
        if (type === 'pk') {
            return () => { this.isLoading = true; setTimeout(this.signInUsingPrivateKey, 1000); }
        } else {
            return () => { this.isLoading = true; setTimeout(this.signInUsingKeystoreFile, 1000); }
        }
    }

    private async signInUsingPrivateKey() {
        const ygg = new yggjs.Ygg(new yggjs.Ygg.providers.HttpProvider(this.$store.state.modules.yggdrash.url));

        const pk = this.privateKey;
        const password = this.passwordForPrivateKey;

        try {
            const { address, keystoreData } = ygg.wallet.import(pk, password);
            const result = ygg.utils.hexString(ygg.wallet.getPrivateKey(keystoreData, password));

            await this.$store.dispatch('modules/yggdrash/signIn', {
                method: 'pk',
                password: this.passwordForPrivateKey,
                pk: this.privateKey
            })                    
        } catch (err) {
            this.isLoading = false;
            EventBus.$emit('open-modal', { 
                component: 'simple-modal',
                options: {
                    title: 'Password is not matched',
                    content: `
                    <p>
                        Please check password is matched to keystore File
                    </p>
                    `
                }
            });
            this.passwordForKeystoreFile = "";
            return;
        }

        this.isLoading = false;
        await this.$store.dispatch('modules/yggdrash/getBalance', {});
        this.$emit('next');
    }

    private async signInUsingKeystoreFile() {

        const ygg = new yggjs.Ygg(new yggjs.Ygg.providers.HttpProvider(this.$store.state.modules.yggdrash.url))

        const password = this.passwordForKeystoreFile;
        const keystoreData = this.keystoreData;

        const result = JSON.stringify(keystoreData);


        // 일단 PK를 패스워드로 뽑아낼 수 있는지 확인
        // 안되면 익셉션 터짐 -> 잡아서 안 된다는 메세지 띄움
        try {
            ygg.wallet.getPrivateKey(this.keystoreData, password)
        } catch(e) {
            console.log(e)
            EventBus.$emit('open-modal', { 
                component: 'simple-modal',
                options: {
                    title: 'Password is not matched',
                    content: `
                    <p>
                        Please check password is matched to keystore File
                    </p>
                    `
                }
            });
            this.passwordForKeystoreFile = "";
            return;
        }

        try {
            await this.$store.dispatch('modules/yggdrash/signIn', {
                method: 'keystore',
                password: this.passwordForKeystoreFile,
                keystoreData: JSON.parse(this.keystoreData)
            })        
        } catch (err) {
            this.isLoading = false;
            console.log()
        } 

        this.isLoading = false;
        await this.$store.dispatch('modules/yggdrash/getBalance', {});
        this.$emit('next');
    }
    
    private get checkConditionForPrivateKeyLogin() : string | undefined {
        return this.privateKey.length == 0 || this.passwordForPrivateKey.length == 0 || !this.agreement1 
                ? "disabled" : undefined
    }

    private get checkConditionForKeystoreLogin() : string | undefined {
        return !this.keystoreData
                || !this.passwordForKeystoreFile 
                || !this.agreement2 
                ? "disabled" : undefined
    }
}
</script>

<style lang="scss" scoped>
#sign-in {
    width: 530px;
    margin-top: 59px;

    margin-left: auto;
    margin-right: auto;
}
</style>
