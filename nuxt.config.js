module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Juan Merkado',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css'}
    ],
     script: [
        { src: '/js/drift-min.js' }
    ]
  },
  css: [
    '~assets/css/luminous-basic.css'
  ],

  /*
  ** Customize the progress bar color
  */
  env: {
    baseApi: 'http://localhost/estoreapi/public/api',
    basePublic: 'http://localhost/estoreapi/public'
  },
  router: {
    middleware: ['sidebar-menu']
  },
  loading: { color: '#3B8070' },
  plugins:[
  '~plugins/vuetify.js', 
  '~plugins/globals.js',
  '~plugins/vue2-filters',
  '~plugins/carousel',
  '~plugins/start-rating',
  '~plugins/vue-google-maps',
   { src: '~/plugins/localStorage.js', ssr: false },
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'vuetify', 'drift-zoom', 'lodash', 'babel-polyfill', 'nuxt-dropzone'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      /*if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }*/
      if (!isClient) {
        // This instructs Webpack to include `vue2-google-maps`'s Vue files
        // for server-side rendering
        config.externals.splice(0, 0, function (context, request, callback) {
          if (/^vue2-google-maps($|\/)/.test(request)) {
            callback(null, false)
          } else {
            callback()
          }
        })
      }
    }
  }
}
