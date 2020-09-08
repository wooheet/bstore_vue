# installation

>  YGGDRASH WALLET

## Packages

1. Check [../package.json](../package.json)

2. These packages are main packages

   ```markdown
   @@nuxtjs/axios
   @yggrash/cli
   @yggdrash/sdk
   axios
   chalk
   jayson
   node-sass
   vue-js-popover
   vuex
   ```

3. These packages can be setup by `npm install`

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Using Build file

1. `npm run generate`
2. `cd dist`
3. Get static compiled file (use nginx for serving)