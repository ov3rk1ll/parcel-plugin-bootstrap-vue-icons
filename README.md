# bootstrap-vue icons parcel plugin

A parcel plugin to remove unused bootstrap-vue icons from final bundle and reduce bundle size.

![language](https://img.shields.io/badge/language-node-gcf.svg?style=flat-square) [![npm package](https://img.shields.io/npm/v/parcel-plugin-bootstrap-vue-icons.svg?style=flat-square)](https://www.npmjs.com/package/parcel-plugin-bootstrap-vue-icons) [![NPM downloads](http://img.shields.io/npm/dm/parcel-plugin-bootstrap-vue-icons.svg?style=flat-square)](https://www.npmjs.com/package/parcel-plugin-bootstrap-vue-icons)

> This plugin is only running when parcel is called with "-experimental-scope-hoisting"

> This plugin overwrites JSConcatPackager, it can be in conflit with other plugin which also overwrite JSConcatPackager.

### Installation

```bash
yarn add -D parcel-plugin-bootstrap-vue-icons

# or with npm

npm install -D parcel-plugin-bootstrap-vue-icons
```

### Usage

The plugin scanns all vue files an will detect any use of `b-icon` to see which icons to keep
