const babel = require('babel-core')
const types = require('babel-types')

const moma = require('./../src/index.js')

const visitor = moma({types});

const code = `
import { Toast, Loading, Button, Confirm } from "@dp/moma-ui";
import { test } from "@dp/moma-ui2"`

const result = babel.transform(code, {
    plugins: [visitor]
})

console.log(result.code)
