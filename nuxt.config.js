export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['@/plugins/apollo.ts', '@/plugins/geolocation.client.ts'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    'nuxt-i18n',
    '@nuxtjs/toast',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  generate: {
    interval: 2000,
  },

  publicRuntimeConfig: {
    shopifyToken: process.env.SHOPIFY_TOKEN,
    ipToken: process.env.IP_TOKEN,
  },

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint:
          'https://wonderland-x-adrian.myshopify.com/api/2019-07/graphql.json',
        httpLinkOptions: {
          headers: {
            'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_TOKEN,
            Accept: 'application/json',
          },
        },
      },
    },
  },

  i18n: {
    locales: [
      {
        code: 'nl',
        iso: 'nl-NL',
      },
      {
        code: 'en',
        iso: 'en-US',
      },
    ],
    defaultLocale: 'nl',
    fallbackLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    vueI18n: {
      numberFormats: {
        en: {
          currency: {
            style: 'currency',
            currency: 'USD',
          },
        },
        nl: {
          currency: {
            style: 'currency',
            currency: 'EUR',
          },
        },
      },
      messages: {
        nl: {
          english: 'Engelse',
          dutch: 'Nederlands',
          collections: 'Collecties',
          home: 'Home',
          browse: 'Kijken',
          cart: 'Winkelwagen',
          addToCart: 'Aan winkelwagen toevoegen',
          checkout: 'Kassa',
          product: 'Product',
          quantity: 'Aantal',
          price: 'Prijs',
          total: 'Totaal',
          emptyCart: 'Uw winkelwagen is leeg.',
        },
        en: {
          english: 'English',
          dutch: 'Dutch',
          collections: 'Collections',
          home: 'Home',
          browse: 'Browse',
          cart: 'Cart',
          addToCart: 'Add To Cart',
          checkout: 'Checkout',
          product: 'Product',
          quantity: 'Quantity',
          price: 'Price',
          total: 'Total',
          emptyCart: 'Your cart is empty.',
        },
      },
    },
  },

  toast: {
    position: 'bottom-center',
    theme: 'outline',
    duration: 2000,
  },
}
