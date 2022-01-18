import axios from "axios";
const isDevelopment = process.env.NODE_ENV === "development";
import pkg from "./package.json";
const titleTemplate = (chunk) => `${chunk} | BAZZI.GG`;
const defaultTitle = "카트라이더 전적 검색";
const defaultDescription = "카트라이더 아이템 전, 스피드 전 전적을 확인해보세요.";
const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";
import webpack from "webpack";
export default {
  loading: false,
  srcDir: "src/",
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */

  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: titleTemplate,
    htmlAttrs: {
      lang: "ko-KR",
    },
    title: defaultTitle,
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale = 1.0,maximum-scale=1.0, user-scalable=no",
      },
      {
        property: "og:title",
        content: defaultTitle,
        template: titleTemplate,
        hid: "og:title",
      },
      {
        hid: "description",
        name: "description",
        content: defaultDescription,
      },
      {
        property: "og:description",
        content: defaultDescription,
        hid: "og:description",
      },
      {
        name: "Keywords",
        content:
          "카트라이더 전적 검색, 카트라이더 통계, 카트 통계, 카트 라이센스, 카트라이더, Kartrider, 카트 전적, 카트",
      },
      { name: "theme-color", content: "#272c34" },
      {
        name: "title",
        template: titleTemplate,
        content: defaultTitle,
        hid: "title",
      },
      { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
      { property: "og:site_name", content: "BAZZI.GG" },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content: "/ico/android-icon-192x192.png",
      },
      { property: "og:image:alt", content: "BAZZI.GG Logo" },
      { name: "autocomplete", content: "off" },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/ico/favicon.ico",
      },
      { rel: "apple-touch-icon", sizes: "72x72", href: "/ico/apple-icon-72x72.png" },
      { rel: "apple-touch-icon", sizes: "114x114", href: "/ico/apple-icon-114x114.png" },
      { rel: "apple-touch-icon", sizes: "144x144", href: "/ico/apple-icon-144x144.png" },
    ],
    script: [{ src: "/IE.js" }],
  },
  /*
   ** Global CSS
   */
  css: [
    { src: "~/assets/scss/buefy.scss", lang: "sass" },
    { src: "~/assets/css/text.css", lang: "css" },
    { src: "~/assets/css/layout.css", lang: "css" },
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    {
      src: "~/plugins/main.js",
      ssr: false,
    },
    {
      src: "~/plugins/axios.js",
      ssr: false,
    },
    { src: "~/plugins/persistedState.client.js" },
    { src: "~/plugins/api.js" },
    { src: "~/plugins/seo.js", ssr: true },
    { src: "~/plugins/track-record-table.js", ssr: true },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: [
    "~/components/stat",
    "~/components/chart",
    "~/components/material",
    "~/components/",
  ],
  /*
   ** Nuxt.js dev-modules
   */
  publicRuntimeConfig: {
    metadataUrl: process.env.APP_METADATA_URL,
  },
  privateRuntimeConfig: {
    Key: process.env.APP_JWT_KEY || "test",
  },
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    "@aceforth/nuxt-optimized-images",
  ],
  optimizedImages: {
    optimizeImages: true,
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/proxy",
    [
      "@nuxtjs/axios",
      {
        proxy: true, // Can be also an object with default options
        debug: isDevelopment,
      },
    ],
    // "@nuxtjs/style-resources",
    ["nuxt-buefy", { css: false, materialDesignIcons: false, defaultIconPack: "" }],
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@nuxtjs/sentry",
    "@nuxtjs/dayjs",
    "@nuxtjs/gtm",
    "@nuxtjs/redirect-module",
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: process.env.APP_FIREBASE_API_KEY,
          authDomain: process.env.APP_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.APP_FIREBASE_PROJECT_ID,
          storageBucket: process.env.APP_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.APP_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.APP_FIREBASE_APP_ID,
          measurementId: process.env.APP_FIREBASE_MEASUREMENT_ID,
        },
        services: {
          firestore: true,
        },
      },
    ],
    "@nuxtjs/dotenv",
  ],
  sitemap: {
    sitemaps: [
      {
        path: "/sitemap.xml",
      },
      {
        path: "/sitemap-rider.xml",
        gzip: true,
        cacheTime: 1000 * 60 * 60, // 30분
        routes: async () => {
          const domain = process.env.APP_API_SERVER_URL || "http://localhost:5000";
          const url = `${domain}/player/nicknames`;
          const { data } = await axios.get(url);
          return data.map((rider) => `/rider/${decodeURI(rider)}`);
        },
        exclude: ["/**"],
      },
    ],
  },
  redirect: async () => {
    if (isMaintenanceMode) {
      return [{ from: "^/(?!maintenance)(.*?)$", to: "/maintenance" }];
    } else {
      return [];
    }
  },
  gtm: {
    id: process.env.APP_GTM_ID,
  },
  proxy: {
    "/api/": {
      target: process.env.APP_API_SERVER_URL || "http://localhost:5000",
      pathRewrite: { "^/api/": "" },
    },
  },
  dayjs: {
    locales: ["en", "ko"],
    defaultLocale: "ko",
    defaultTimeZone: "Asia/Seoul",
    plugins: ["duration", "relativeTime", "timezone", "utc"],
  },
  sentry: {
    dsn: process.env.APP_SENTRY_DSN,
    disabled: isDevelopment,
    publishRelease: true,
    sourceMapStyle: "source-map",
    config: {
      environment: process.env.NODE_ENV,
      release: pkg.version,
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extractCSS: {
      ignoreOrder: true,
    },
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? "source-map" : "inline-source-map";
      }
      config.resolve.alias.vue = "vue/dist/vue.common";
    },
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /moment$/,
      }),
    ],
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve("@nuxt/babel-preset-app"),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? "server" : "client",
              corejs: { version: 3 },
            },
          ],
        ];
      },
    },
  },
};
