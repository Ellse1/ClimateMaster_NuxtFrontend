const webpack = require("webpack");
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: "msvalidate.01", content: "84F64E943DD9480D2348C73A15956C5E" },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png'}
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js' },
      { src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js' },
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js' },
      // { src: 'https://www.paypal.com/sdk/js?client-id=AZ2WeCHVS1LJyjAxz3XB-Fh5MiTCWJyOZjJ3iZOcq19iS32_4wSCRHipiAB0LHuluQfCZsw29FMk_E7g&currency=EUR'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue-scrollto',
     '~/plugins/mixins/user',
      {src:'~/plugins/vue-js-toggle-button', mode:'client'},
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    //For Authentication
    '@nuxtjs/auth',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Fontawsome for icons
    ['nuxt-fontawesome', {
      component: 'font-awesome-icon', 
      imports: [
        //import whole set
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        },
      ]
    }]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    https: false,
    baseURL: 'http://localhost:8000/api',
    //browserBaseURL: 'http://www.climate-master.com/api',
  },

  //For Authentication
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'meta.token' },
          user: { url: 'user', method: 'get', propertyName: 'data' },
          logout: {url: 'logout', method: 'post'}
        }
      }
    },
    redirect:{
      login: '/account/login',
      home: '/account/myProfile'
    }
  },
  /*
  ** Build configuration
  */
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {

    }
  }
}
