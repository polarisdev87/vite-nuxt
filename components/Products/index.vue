<template>
    <section>
      <div id="platform">
        <div class="is-flex products__platform">
          <text-card 
            :title="$t('products.platform.title')" 
            :text-list="$t('products.platform.textList')"
            :outer-link-name="link.platform.name"
            :outer-link="link.platform.url"
            style="margin-right: 25px;">
          </text-card>
          <Feature></Feature>
        </div>
        <Stats></Stats>
      </div>
      
      <div 
        class="products__common is-flex" 
        v-for="(item, index) in list" 
        :key="index"
        :id="item">
        <img :src="require(`~/assets/images/product/products${index+1}.png`)" />
        <text-card 
          :class="`mt products__${item}-text`"
          :title="$t(`products.${item}.title`)" 
          :text-list="$t(`products.${item}.textList`)"
          :outer-link-name="link[item].name"
          :outer-link="link[item].url"
          :key-str="item === 'wallet' ? item : ''">
        </text-card>
      </div>
    </section>
</template>

<script type="text/babel">
import textCard from './textCard';
import Feature from '~/components/feature';
import Stats from './Stats/index.vue';

export default {
  components: {
    textCard,
    Feature,
    Stats
  },
  data: function () {
    return {
      list: ['wallet', 'exchange', 'pay'],
    };
  },
  computed: {
    link() {
      return {
        platform: {
          name: this.$t('product.platform.subtitle'),
          url: 'https://vite.wiki/'
        },
        wallet: {
          name: this.$t('product.wallet.subtitle')
        },
        exchange: {
          name: this.$t('product.exchange.subtitle'),
          url: 'https://x.vite.net'
        },
        pay: {
          name: this.$t('product.pay.subtitle'),
          url: this.$i18n.locale === 'zh' ? 'https://vite.store/' : 'https://global.vite.store'
        }
      };
    }
  },
  methods: {
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~assets/vars";

section {
  img {
    width: 600px;
    margin-top: -50px;
    @include touch {
      width: 500px;
    }
    @include mobile {
      width: 350px;
      margin-bottom: 30px;
    }
  }
  .products__platform {
    @include mobile {
      flex-direction: column;
    }
  }
  .products__common {
    margin-top: 90px; 
    @include mobile {
      flex-direction: column;
    }
    &:nth-child(odd) {
      flex-direction: row-reverse;
    }
    @include mobile {
      &:nth-child(odd) {
        flex-direction: column;
      }
    }
    img {
      align-self: center;
    }
  }
  .products__wallet-text {
    margin-left: 50px; 
    @include mobile {
      margin-left: 0px; 
    }
  }
  .products__exchange-text {
    margin-right: 50px; 
    @include mobile {
      margin-right: 0px; 
    }
  }
  .products__pay-text {
    margin-left: 50px;
    @include mobile {
      margin-left: 0px; 
    }
  }
}
</style>
