const babel = require('babel-core')
const types = require('babel-types')

const moma = require('./../src/index.js')

const visitor = moma({types});

const code = `
import Toast from '@dp/moma-ui/Toast/merchant';
import Input from '@dp/moma-ui/Input/merchant';
import Button from '@dp/moma-ui/Button/merchant';
import Confirm from '@dp/moma-ui/Confirm/merchant';
import Loading from '@dp/moma-ui/Loading/merchant';
import Checkbox from '@dp/moma-ui/Checkbox/merchant';
import { ModelComponent } from '@dp/moma-ui/Model/merchant';`

const result = babel.transform(code, {
    plugins: [visitor]
})

console.log(result.code)
