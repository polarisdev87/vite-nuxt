const hostname = 'https://www.vite.org';

const scrollBehavior = function (to, from) {
  const position = {};

  if (to.hash) {
    position.selector = to.hash;
    if (document.querySelector(to.hash)) {
      return position;
    }
    return {
      x: 0,
      y: 0
    };
  } 

  return new Promise(resolve => {
    position.x = 0;
    position.y = 0;
    resolve(position);

    // wait for the out transition to complete (if necessary)
    // this.app.$root.$once('triggerScroll', () => {
    //   // if the resolved position is falsy or an empty object,
    //   // will retain current scroll position.
    //   resolve(position);
    // });
  });
  // }
};

const routes = [
  {
    url: '/',
    priority: 1,
    img: [
      {
        url: `${hostname}/icon.png`,
        caption: 'Vite logo',
        title: 'Vite logo'
      },
      {
        url: `${hostname}/logo_appstore.png`,
        caption: 'Vite logo for appstore',
        title: 'Vite logo for appstore'
      }
    ]
  },
  {
    url: '/faq',
    priority: 0.3
  }
];
const whitepaperUrls = [
  {
    lang: 'en',
    url: 'https://www.vite.org/whitepaper/vite_en.pdf'
  },
  {
    lang: 'zh',
    url: 'https://www.vite.org/whitepaper/vite_cn.pdf'
  }
];
const sitemapUrls = [];
const locales = [
  {
    code: 'en',
    name: 'EN',
    langFile: 'en.json'
  },
  {
    code: 'zh',
    name: '中文',
    langFile: 'zh.json'
  }
];
const defaultLocale = 'en';

routes.forEach((route) => {
  let links = locales.map((locale) => {
    let lang = locale.code;
    let url = `${hostname}/${lang}${route.url}`;
    if (defaultLocale === lang) {
      url = `${hostname}${route.url}`;
    }
    return {
      lang,
      url
    };
  });
  links.forEach(({url}) => {
    sitemapUrls.push({
      ...route,
      url,
      changefreq: 'daily',
      links: links
    });
  });
});

whitepaperUrls.forEach(({lang, url}) => {
  sitemapUrls.push({
    url,
    links: whitepaperUrls
  });
});

module.exports = {
  head: {
    title: 'A high-performance decentralized ecosystem',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'author', content: 'vite lab'},
      {name: 'keywords', content: 'vite,crypto,dag,bitcoin,vitecoin,contract platform'}
    ]
  },
  loading: {
    color: '#7FB2FE'
  },
  build: {
    extractCSS: true,
    vendor: ['babel-polyfill'],
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          warnings: false // Fix bulma css warnings
        }
      }
    }
  },
  plugins: ['~/plugins/fontawesome', {src: '~/plugins/vue-headroom', ssr: false}],
  router: {
    mode: 'history',
    middleware: 'i18n',
    scrollBehavior
  },
  modules: [
    // '@nuxtjs/webpackmonitor',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa',
    ['nuxt-i18n', {
      locales,
      defaultLocale,
      detectBrowserLanguage: true,
      redirectCookieKey: 'redirected',
      useRedirectCookie: true,
      loadLanguagesAsync: true,
      langDir: 'locales/',
      ignorePaths: [],
      vueI18n: {
        fallbackLocale: defaultLocale,
        messages: {
          /*
          * make the default locale can work in fallback in ssr.
          * */
          en: require('./locales/en.json')
        }
      }
    }],
    ['@nuxtjs/google-analytics', {
      id: 'UA-118987496-1'
    }],
    '@nuxtjs/sitemap'
  ],
  axios: {
    prefix: '/api',
    proxy: true,
    credentials: true
  },
  proxy: {
    '/api': {
      target: 'https://testnet-vite-1257137467.cos.ap-hongkong.myqcloud.com/discover',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    }
  },
  css: [
    '~/assets/main.scss'
  ],
  render: {
    gzip: { threshold: 1 }
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: hostname,
    gzip: true,
    generate: true,
    exclude: [
      '/technology',
      '/careers',
      '/',
      '/faq'
    ].concat(locales.map((lang) => {
      return `/${lang.code}/**`;
    })).concat(locales.map((lang) => {
      return `/${lang.code}`;
    })),
    routes: sitemapUrls
  }
};
