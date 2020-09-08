<script src="../types/transaction.d.ts"></script>
<script src="../store/index.ts"></script>
<template>
  <div id="layout">
    <section id="sidebar">
      <img class="logo" src="http://www.beautifulstore.org/wp-content/themes/bs/images/brand.png" alt="Beautiful Store"
           width="182" height="48" srcset="http://www.beautifulstore.org/wp-content/themes/bs/images/brand@2x.png 2x"
           @click='$router.push("/")'>
      <ul id="sidebar-menu">
        <li class="sitemap"
            :class='{ active: navLinks[0] === $route.path }'
            @click="clickNavLink(0)">
          <img src="~/assets/icons/sidebar_create_account_icon.svg" alt="Create Account"/>
          Quick donation
        </li>
        <li class="sitemap">
          <drop-down-box>
            <template v-slot:trigger>
                <img src="~/assets/icons/sidebar_more_icon.svg" alt="More"> More
            </template>
            <template v-slot:selections>
                <a href="http://www.beautifulstore.org/" target="_blank"><li>아름다운 가게</li></a>
                <a href="http://www.beautifulstore.org/findstore" target="_blank"><li>오프라인 매장</li></a>
            </template>
          </drop-down-box>
        </li>
      </ul>
    </section>
    <section id="content" :class='{"dark-mode": $route.path == "/"}'>
      <modals-container />
      <nuxt :key='refreshCount' />
    </section>
  </div>
</template>
<script lang="ts">
import {
    Component,
    Vue,
    Prop
} from "nuxt-property-decorator";

import DropDownBox from '~/components/ui/DropDownBox.vue';
import ModalsContainer from "~/components/ModalsContainer.vue";

@Component({
    components: {
        DropDownBox,
        ModalsContainer
    }
})
export default class App extends Vue {
    private isActive : boolean[] = [false, false, false, false, false, false];
    private refreshCount : number = 0;

    private navLinks : string[] = ["/create", "/access", "/transfer", "/faucet", "#", "#"];

    private flush() {
        for(let index = 0; index < this.isActive.length; index++) {
            this.isActive[index] = false;
        }
    }

    private toggleActive(index : number) {
        this.isActive[index] = true;
    }

    private clickNavLink(index: number) {
        this.flush();
        this.toggleActive(index);
        this.$router.push(this.navLinks[index]);
        this.refreshCount += 1;
    }
}
</script>

<style lang="scss" src='~/assets/css/App.scss'>
</style>

