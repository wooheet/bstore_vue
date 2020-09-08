<template>
  <content-wrapper>
    <div class="main-page">
      <h1 class="header">Welcome to BStore</h1>
      <h2 class="header">환영합니다 아름다운 가게에서 기부 및 기증을 해보세요!</h2>
      <div class="buttons">
        map

      </div>

      <div class="description">
        <h2 class="header">About BStore</h2>
        <ul>
          <li><p>
            YGGDRASH network does NOT store a user’s private key on its servers. User’s private key is stored ONLY in the user’s browser’s local storage and it is automatically deleted when a user closes the browser or clicks the &lt;Clear Private Key&gt; button.
          </p></li>
          <li><p>
            YGGDRASH recommends users to use YGGDRASH Wallet on the YGGDRASH TestNet for the purpose of TestNet ONLY.
          </p></li>
          <li><p>
            Saving and safekeeping the Keystore file will be your responsibility. YGGDRASH Wallet is NOT responsible for the loss of the user’s password or Keystore file.
          </p></li>
        </ul>
      </div>
    </div>
  </content-wrapper>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator"

import CustomButton from '~/components/ui/Button.vue';
import ContentWrapper from '~/components/ContentWrapper.vue';

@Component({
    components: {
      CustomButton,
      ContentWrapper
    }
})
export default class App extends Vue {
  goToCreateAccount() {
    this.$router.push('/create')
  }

  goToViewAccount() {
    this.$router.push('/access')
  }

  goToSendYeed() {
    this.$router.push('/transfer')
  }

  goToYeedFaucet() {
    this.$router.push('/faucet')
  }
}
</script>

<style lang="scss" src="~/assets/css/main.scss" scoped>
</style>

