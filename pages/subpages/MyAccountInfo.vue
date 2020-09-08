<template>
    <div id='my-account-info'> 
        <div class="account-info">
            <h1 class="header">My Account Info</h1>
            <div class="fields-wrapper">

            </div>
            <h4 class="header">Address</h4>
            <copy-only-field :value='$store.state.modules.yggdrash.address'>
                <template v-slot:front-annotation>
                    <div>Hex</div>
                </template>
            </copy-only-field>
            <h4 class="header">Private Key</h4>
            <copy-only-field encrypted :value='$store.state.modules.yggdrash.privateKey'/>
            <h4 class="header">YGGDRASH Wallet Key</h4>
            <copy-only-field encrypted :value='$store.state.modules.yggdrash.privateKey'/>
            <br>
            <div class="actions">
                <div class="action">
                    <h4 class="header">
                        Transaction List
                    </h4>
                    <p>Explore all transactions involving your TestNet account.</p>
                    <custom-button 
                        is-secondary-button
                        :onClick='openTransactionList'>
                        View Transaction List
                    </custom-button>
                </div>
                <div class="action">
                    <h4 class="header">
                        Download Keystore file
                    </h4>
                    <p>Keystore is password encrypted private key that is in text format or in a file, which contains an address and parameters related to cryptographic operations.</p>
                    <custom-button 
                        is-primary-button
                        :onClick="download">
                        <a ref="download" id="download-button" style="display:none" :href="convertedData" download="keystore.json"></a>
                        Keystore Download
                    </custom-button>
                </div>
            </div>
        </div>
        <div class="balance">
            <h1 class="header">Balance</h1>
            <p class="caution">
                <img src="~/assets/icons/warning_icon.svg" /> YGGDRASH Wallet will be used only for the developmental purpose. TestNet YEED has no financial value.
            </p>
            <div class="tokens">
                <div class="token">
                    <div class="token-label">● YEED</div>
                    <div class="value">
                        {{ this.$store.state.modules.yggdrash.balance }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang='ts'>
import {
    Component,
    Vue
} from "nuxt-property-decorator"

import CopyOnlyField from '~/components/ui/CopyOnlyField.vue';
import CustomButton from '~/components/ui/Button.vue';

@Component({
    components: {
        CopyOnlyField,
        CustomButton,
    }
})
export default class MyAccountInfo extends Vue {
    private address: string = ''
    private privateKey: string = '';
    private walletKey: string = '';

    async mounted() {
        if (this.address) {
            const intervals = this.$store.state.modules.yggdrash.intervalIds;
            for(var i = 0; i < intervals.length; ++i) {
                window.clearInterval(intervals[i]);
            }

            await this.$store.dispatch('modules/yggdrash/clearInterval', {})

            await this.getBalance();
            const intervalId = window.setInterval(() => {
                this.getBalance()
            }, 5000);

            await this.$store.dispatch('modules/yggdrash/appendInterval', { intervalId })
        }     
    }

    async destroyed() {
        const intervals = this.$store.state.modules.yggdrash.intervalIds;
        for(var i = 0; i < intervals.length; ++i) {
            window.clearInterval(intervals[i]);
        }

        await this.$store.dispatch('modules/yggdrash/clearInterval', {})
    }

    async getBalance() {
        await this.$store.dispatch('modules/yggdrash/getBalance', {});
    }

    openTransactionList() {
        const url = `https://testnet.yggdrash.io/yggdrash/account/${this.$store.state.modules.yggdrash.address.toLowerCase()}`;
        window.open(url);
    }

    get convertedData() {
        if (process.client) {
            const contentType = 'application/json'
            const dData = JSON.stringify(this.$store.state.modules.yggdrash.keystoreData , null, 2)
            const blob = new Blob([dData], { type: contentType })
            const url = window.URL.createObjectURL(blob)

            return url;
        } else {
            return null;
        }
    }

    download() {
        (this.$refs.download as HTMLElement).click()
    }
}
</script>

<style lang="scss" scoped>
    #my-account-info {
        margin-left: 70px;
        margin-right: 70px;

        display: flex;
        justify-content: space-between;
        
        .account-info {
            margin-top: 59px;
            flex-basis: 450px;

            .fields-wrapper {
                margin-top: 50px;
            }

            .actions {
                display: flex;
                justify-content: space-between;

                .action {
                    width: 200px;

                    * {
                        width: 100%;
                    }
                }
            }
        }

        .balance {
            flex-basis: 290px;
            margin-top: 30px;
            margin-bottom: 47px;
            padding: 30px;
            height: 633px;
            border-radius: 5px;
            box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15);
            background-color: #ffffff;


            .tokens {
                margin-top: 40px;

                .token-label {
                    height: 20px;
                    font-size: 14px;
                    font-weight: bold;
                    font-style: normal;
                    font-stretch: normal;
                    line-height: 1.43;
                    letter-spacing: normal;
                    text-align: left;
                    color: #1b3031;

                    &::first-letter {
                        color: #4fccaa;
                        margin-right: 5px;
                    }

                }

                .value {
                    margin-top: 4px;
                    margin-left: 22px;

                    font-size: 12px;
                    font-weight: normal;
                    font-style: normal;
                    font-stretch: normal;
                    line-height: 1.33;
                    letter-spacing: normal;
                    text-align: left;
                    color: #96afb2;
                }
            }
        }


    }
</style>
