export default {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  head: {
    title: "Beautiful Store",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "YGGDRASH WALLET" },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ]
  },
  loading: { color: "#3B8070" },
  build: {
    loaders: [
      {
        test: /\.(scss)$/,
        loader: 'sass-loader',
        query: {
          limit: 10000,
          name: 'css/[name].[hash].[ext]'
        }
      }
    ]
  },
  modules: [
    "@nuxtjs/axios",
  ],
  plugins: [
    '~plugins/vue-clipboard2',
    '~plugins/vue-popover',
  ],
  serverMiddleware: [
  ],
  axios: {}
}
