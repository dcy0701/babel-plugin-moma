const babel = require('babel-core')
const types = require('babel-types')

const moma = require('./../src/index.js')

const visitor = moma({types});

const code = `
import { Radio, Toast, Button, Loading } from '@dp/moma-ui/merchant'
`

const result = babel.transform(code, {
    plugins: [visitor]
})

console.log(result.code)
