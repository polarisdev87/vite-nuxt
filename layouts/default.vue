<template>
  <div
    class="public __vite__"
    :class="`is-${routeName}-public`"
  >
    <div class="airdrop__fiexd" v-if="routeName !== 'airdrop'">
      <a
        :href="urls.exchange.vitex"
        target="_blank"
        class="text-hover-transition"
      >
        {{$t('home.gotoVitex')}}
      </a>
      <!--<nuxt-link-->
        <!--:to="localePath('airdrop')"-->
        <!--class="text-hover-transition">-->
        <!--{{$t('home.jionAirdrop')}}-->
      <!--</nuxt-link>-->
    </div>
    <no-ssr>
      <dialog-compo
        :visible.sync="dialogVisible"
        v-if="routeName === 'index'">
        <div class="is-flex dialog__img" style="justify-content: center;">
          <img src="~/assets/images/vitex.svg"/>
        </div>
        <!-- <div style="margin-top: 23px;">{{$t('home.jionAirdrop')}}</div> -->
        <span slot="footer">
          <div @click="dialogVisible = false" >
            <nuxt-link
              :to="localePath('airdrop')"
              class="footer-btn">
              {{$t('home.gotoVitex')}}
            </nuxt-link>
          </div>
        </span>
      </dialog-compo>
    </no-ssr>
    <div
      class="navbar headroom"
      :class="`is-${routeName}-page`"
      v-headroom
    >
      <div
        class="container is-widescreen"
        :class="{ 'is-open': navbarActive }"
        @click="onNavClick"
      >
        <div class="navbar-brand">
          <div @click="onLogoClick">
            <nuxt-link
              class="navbar-item nav-item nav-item-logo"
              :to="localePath('index')"
            >
              <logo-without-words class="logo"></logo-without-words>
            </nuxt-link>
          </div>
          <div
            class="navbar-burger"
            @click="onBurgerClick"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div
          class="navbar-menu"
          :class="{ 'is-active': navbarActive, collapsing: collapsing }"
        >
          <div
            ref="navbarStart"
            class="navbar-start">
            <div class="nav-item">
              <secondary-menu
                :footer-name="$t(`nav.production`)"
                footer-to="products"
                :secondary-list="navProductionList">
                <explorer></explorer>
              </secondary-menu>
            </div>
            <div class="nav-item">
              <secondary-menu
                :footer-name="$t(`nav.person`)"
                footer-to="figure"
                :secondary-list="navPersonList">
              </secondary-menu>
            </div>
            <div class="nav-item">
              <voteNotice></voteNotice>
            </div>
            <div class="nav-item">
              <secondary-menu
                :footer-name="$t(`nav.medium`)"
                footer-to="medium"
                :secondary-list="navMediaList">
              </secondary-menu>
            </div>
            <div class="nav-item">
              <Exchange></Exchange>
            </div>
            <div class="nav-item">
              <secondary-menu
                :footer-name="$t(`nav.guide`)"
                :secondary-list="navGuideList">
              </secondary-menu>
            </div>
            <nuxt-link
              :key="item"
              :to="localePath(item)"
              class="nav-item text-hover-transition"
              :class="{active: routeName === item}"
              v-for="item in navs"
            >
              {{$t(`nav.${item}`)}}
            </nuxt-link>
          </div>
          <div
            ref="navbarEnd"
            class="navbar-end"
          >
            <div class="nav-item">
              <lang-select></lang-select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="nuxt-content"
      :class="`is-${routeName}-page`"
    >
      <transition name="fade" mode="out-in" @after-leave="afterLeave">
        <nuxt :keep-alive="true"></nuxt>
      </transition>
    </div>
    <v-footer
      :nav-production-list="navProductionList"
      :nav-person-list="navPersonList"
      :nav-guide-list="navGuideList"
      :nav-media-list="navMediaList">
    </v-footer>
  </div>
</template>

<script type="text/babel">
import Cookies from 'js-cookie';
import dialogCompo from '~/components/dialog/component.vue';
import LangSelect from '~/components/LangSelect.vue';
import Logo from '~/components/Logo.vue';
import LogoWithoutWords from '~/components/LogoWithoutWords.vue';
import Footer from '~/components/Footer.vue';
import config from '~/config';
import voteNotice from '~/components/voteNotice.vue';
import about from '~/components/about.vue';
import Exchange from '~/components/Exchange.vue';
import SecondaryMenu from '~/components/SecondaryMenu.vue';
import Explorer from '~/components/Explorer.vue';

export default {
  components: {
    LangSelect,
    Logo,
    LogoWithoutWords,
    VFooter: Footer,
    Exchange,
    voteNotice,
    about,
    dialogCompo,
    SecondaryMenu,
    Explorer
  },
  head () {
    let { routeName } = this;
    let title = this.$t(`nav.${routeName}`) + ' - ' + this.$t('head.title');

    let description = this.$t(`head.description.${routeName}`);
    let iconUrl = 'https://vite.org/icon.png';
    let structuredData = [
      {
        '@context': 'http://schema.org',
        '@type': 'Organization',
        url: 'https://vite.org',
        name: 'Vite labs.',
        description: description,
        image: iconUrl,
        brand: {
          '@type': 'Brand',
          name: 'VITE',
          logo: iconUrl
        },
        sameAs: [config.urls.twitter]
      }
    ];
    return {
      meta: [
        { hid: 'description', name: 'description', content: description },
        {
          name: 'google-site-verification',
          content: 'MyUvG14lvMm-nYCWoXYE9NT21vRda-kIT6xMETrGqZk'
        },
        {
          name: 'renderer',
          content: 'webkit'
        },
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge,chrome=1'
        },
        // Open Grapg
        { name: 'og:title', content: title, hid: 'og:title' },
        { name: 'og:description', content: description, hid: 'og:description' },
        { name: 'og:type', content: 'website', hid: 'og:type' },
        { name: 'og:url', content: 'https://vite.org', hid: 'og:url' },
        { name: 'og:image', content: 'https://www.vite.org/icon.png' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary', hid: 'twitter:card' },
        { name: 'twitter:site', content: '@vitelabs', hid: 'twitter:site' },
        { name: 'twitter:title', content: title, hid: 'twitter:title' },
        {
          name: 'twitter:description',
          content: description,
          hid: 'twitter:description'
        },
        {
          name: 'twitter:image:alt',
          content: 'Vite Logo',
          hid: 'twitter:image:alt'
        },
        {
          name: 'twitter:image',
          content: 'https://www.vite.org/logo_appstore.png'
        }
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: structuredData.map(item => {
        return {
          innerHTML: JSON.stringify(item),
          type: 'application/ld+json'
        };
      })
    };
  },
  data: function () {
    return {
      dialogVisible: false,
      navProductionList: [{
        type: 'inner',
        name: 'platform',
        to: 'products',
        anchor: 'platform'
      }, {
        type: 'inner',
        name: 'wallet',
        to: 'products',
        anchor: 'wallet'
      }, {
        type: 'inner',
        name: 'exchange',
        to: 'products',
        anchor: 'exchange'
      }, {
        type: 'inner',
        name: 'pay',
        to: 'products',
        anchor: 'pay'
      }],
      navPersonList: [{
        type: 'inner',
        name: 'team',
        to: 'figure',
        anchor: 'team'
      }, {
        type: 'inner',
        name: 'counselor',
        to: 'figure',
        anchor: 'advisor'
      }, {
        type: 'inner',
        name: 'community',
        to: 'figure',
        anchor: 'community'
      }, {
        type: 'inner',
        name: 'investor',
        to: 'figure',
        anchor: 'investor'
      }],
      navMediaList: [{
        type: 'inner',
        name: 'video',
        to: 'medium',
        anchor: 'video'
      },{
        type: 'inner',
        name: 'blogs',
        to: 'medium',
        anchor: 'blogs'
      }, {
        type: 'inner',
        name: 'news',
        to: 'medium',
        anchor: 'news'
      }],
      navbarActive: false,
      navs: ['airdrop'],
      collapsing: false,
      urls: config.urls
    };
  },
  created() {
    if (!Cookies.get('airdropDialog')) {
      Cookies.set('airdropDialog', 'true', { expires: 1 });
      this.dialogVisible = true;
    } else {
      this.dialogVisible = false;
    }
  },
  computed: {
    navGuideList() {
      let tutoriallink = this.$i18n.locale === 'zh' ? 'https://vite.wiki/zh/tutorial/start/' : 'https://vite.wiki/tutorial/start/';
      return [{
        type: 'outer',
        name: 'tutorial',
        to: tutoriallink
      }, {
        type: 'inner',
        name: 'faq',
        to: 'faq'
      }];
    },
    routeName () {
      if (!this.$route || !this.$route.name) return 'index';
      return this.$route.name.split('-')[0];
    },
    navbarEndStyle () {
      if (this.navbarActive) {
        return {
          height: this.$refs.navbarEnd.clientHeight + 'px',
          overflowY: this.collapsing ? 'hidden' : 'visible'
        };
      } else {
        return {
          height: 0
        };
      }
    }
  },
  methods: {
    afterLeave () {
      this.$root.$emit('triggerScroll');
    },
    openDotNet () {
      window.open(
        'https://international.bittrex.com/Market/Index?MarketName=BTC-VITE'
        // this.$i18n.locale === 'zh' ? 'https://vite.net/zh/' : 'https://vite.net'
      );
    },
    openAirdropPage () {
      let lang = '';
      this.$i18n.locale !== 'en' ? lang = `/${this.$i18n.locale}` : lang = '';
      this.$router.push({path: `${lang}/airdrop/`});
    },
    onNavClick (e) {
      let { target } = e;
      if (
        target &&
        target.className &&
        typeof target.className === 'string' &&
        target.className.indexOf('nav-item') > -1
      ) {
        this.navbarActive = false;
      }
    },
    onLogoClick () {
      this.navbarActive = false;
    },
    onBurgerClick () {
      this.collapsing = true;
      this.navbarActive = !this.navbarActive;
      setTimeout(() => {
        this.collapsing = false;
      }, 500);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "assets/vars.scss";
.airdrop__fiexd {
  position: fixed;
  right: 40px;
  bottom: 40px;
  z-index: 999;
  background-image: url("~assets/images/airdrop.svg");
  background-size: cover;
  width: 265px;
  height: 66px;
  font-size:16px;
  font-family:$font-family-title;
  font-weight:600;
  box-sizing: border-box;
  text-align: center;
  line-height:66px;
  cursor: pointer;
  a {
    display: inline-block;
    text-align: center;
    margin-left: -45px;
    width: 265px;
    height: 66px;
    color: white;
  }
}
.dialog__img {
  @media only screen and (min-width: 320px) and (max-width: 767px)  {
    height: 100px;
  }
}
.footer-btn {
  display: inline-block;
  width:242px;
  height:50px;
  line-height: 50px;
  font-size:16px;
  font-family:$font-family-title;
  font-weight:600;
  color: white;
  background:rgba(0,122,255,1);
  box-shadow:0px 10px 20px 0px rgba(126,183,238,0.83);
  border-radius:2px;
  cursor: pointer;
}
.public {
  background: no-repeat url("~assets/images/bg/footer_others.svg") 0% 100%;
}

.is-index-public {
  background: no-repeat url("~assets/images/bg/footer_index.svg") -15% 100%/850px
    1000px;
  @include touch {
    background: none;
  }
}

.img-text {
  position: absolute;
  cursor: pointer;
  right: 0;
  top: 79px;
  z-index: 999;
  width: 153px;
  height: 131px;
  text-align: center;
  color: white;
  font-family: $font-family-title;
  font-size: 13px;
  padding-top: 30px;
  @include touch {
    top: 0px;
  }
  .act {
    max-width: 130px;
    margin:10px;
  }
}
.nuxt-content {
  margin-top: 72px;
  @include touch {
    padding-bottom: 50px;
  }
}
.is-index-page {
  margin-top: 0;
  background: no-repeat url("~assets/images/bg/index/topright3.svg") 100% 0%,
    no-repeat url("~assets/images/bg/index/topleft1.svg") -1% 9%,
    no-repeat url("~assets/images/bg/index/topleft2.svg") 0% 3%,
    no-repeat url("~assets/images/bg/index/topleft3.svg") 0% 8%,
    // no-repeat url("~assets/images/bg/index/topright1.svg") 90% 9%,
    no-repeat url("~assets/images/bg/index/topright2.svg") 110% 6%/ 900px 1000px,
    no-repeat url("~assets/images/bg/index/rightbottom.svg") 125% 97%/620px
      526px;

  @include touch {
    background: no-repeat url("~assets/images/bg/index/topright3.svg") 150% 0%,
      no-repeat url("~assets/images/bg/index/topright1.svg") 90% 11%/ 230px 230px;
  }
  @include mobile {
    background: no-repeat url("~assets/images/bg/index/topright3.svg") 100% 0%,
      no-repeat url("~assets/images/bg/index/topleft3.svg") -1% 5%;
    background-size: 60%;
  }
}
.is-team-page {
  margin-top: 0;
  background: no-repeat url("~assets/images/bg/team/topleft.svg") -58% 0%,
    no-repeat url("~assets/images/bg/team/topright.svg") 100% 20%,
    no-repeat url("~assets/images/bg/team/bottomright.svg") 110% 95%;
  @include touch {
    background: no-repeat url("~assets/images/bg/team/topleft.svg") -58% 0%,
      no-repeat url("~assets/images/bg/team/topright.svg") 100% 20%;
  }
}
.is-partnership-page {
  background: no-repeat url("~assets/images/bg/partnership/topleft.svg") -8% 2%,
    no-repeat url("~assets/images/bg/team/bottomright.svg") 110% 95%;
}
.is-community-page {
  background: no-repeat url("~assets/images/bg/partnership/topleft.svg") -8% 2%,
    no-repeat url("~assets/images/bg/community/rightbottom.svg") 110% 95%;
}
.is-airdrop-page {
  margin-top: 0;
  background: $common-bg-color url("~assets/images/bg/airdrop/airdropbg.svg") no-repeat center;
  @include touch {
    background: no-repeat url("~assets/images/bg/airdrop/bgpic.png") 60% 0%;
  }
  @include mobile {
    background: no-repeat url("~assets/images/bg/airdrop/bg.png") 50% 0%;
  }
}
.airdrop-hide{
  display: none;
}
.navbar {
  border-bottom: 1px solid transparent;
  z-index: 222222;
  background: #fff;

  &.headroom--not-top {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    background: white;
  }
  @include desktop {
    &.is-index-page.headroom--top {
      background: transparent;
    }
  }
  a.navbar-item:hover {
    background-color: white;
  }
  .navbar-brand {
    height: $navbar-height;
    .nav-item {
      height: 100%;
      cursor: pointer;
    }
  }
  .nav-item {
    padding: 0.5rem 18px;
    color: $common-text-color;
    font-family: $font-family-light;
    &:hover {
      color: $common-active-color;
    }
    &.active {
      color: $common-active-color;
    }
  }
  .nav-item-logo {
    padding: 0 57px 0 0;
  }
  .navbar-menu {
    @include desktop {
      height: auto !important;
    }
  }
}

@include touch {
  .nuxt-content {
    margin-top: 41px;
  }
  .navbar {
    min-height: 40px;
    height: auto;
    .navbar-brand {
      min-height: 40px;
      height: 40px;
      .logo {
        height: 22px;
        transition: transform 0.4s ease-in-out;
      }
      .navbar-burger {
        height: 40px;
        width: 49px;
        span {
          width: 19px;
          right: 50%;
          left: auto;
          margin-right: -10px;
          transition: all 0.3s ease-in-out;
          &:nth-child(2) {
            width: 15px;
          }
        }
      }
    }

    .is-open {
      .navbar-brand {
        .logo {
          /*transform: translateX(16px);*/
          transform: rotate(30deg);
        }
        .navbar-burger {
          span {
            &:nth-child(2) {
              width: 19px;
            }
            &:nth-child(1),
            &:nth-child(3) {
              width: 9px;
              margin-right: -5px;
            }
          }
        }
      }
    }

    .nav-item {
      padding: 11px 16px;
    }

    .navbar-menu {
      padding: 0 32px;
      transition: all 0.5s ease-in-out;
      &:not(.is-active) {
        height: 0;
        overflow-y: hidden;
        display: block;
      }
      .navbar-end {
        padding: 0.5rem 0;
      }
      .nav-item {
        height: 48px;
        padding-left: 0;
      }
      .line {
        height: 1px;
        margin: 0.5rem 0;
        background: rgba(0, 0, 0, 0.05);
        padding: 0;
      }
    }

    & > .container {
      min-height: 40px;
      height: auto;
    }
  }
}
</style>
