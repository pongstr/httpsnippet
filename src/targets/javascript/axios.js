/**
 * @description
 * HTTP code snippet generator for Javascript & Node.js using Axios.
 *
 * @author
 * @rohit-gohri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
'use strict'

const util = require('util')
const stringifyObject = require('stringify-object')
const CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  const opts = Object.assign({
    indent: '  '
  }, options)

  const code = new CodeBuilder(opts.indent)

  code.push('import axios from "axios";')
    .blank()

  const reqOpts = {
    method: source.method,
    url: source.url
  }

  if (Object.keys(source.queryObj).length) {
    reqOpts.params = source.queryObj
  }

  if (Object.keys(source.allHeaders).length) {
    reqOpts.headers = source.allHeaders
  }

  switch (source.postData.mimeType) {
    case 'application/x-www-form-urlencoded':
      reqOpts.data = source.postData.paramsObj
      break

    case 'application/json':
      if (source.postData.jsonObj) {
        reqOpts.data = source.postData.jsonObj
      }
      break

    case 'multipart/form-data':
      delete reqOpts.headers['Content-Type']
      delete reqOpts.headers['content-type'] // content-type header will come from the data.getHeaders() with the right boundary

      code.push('const data = new FormData();')

      source.postData.params.forEach(function (param) {
        if (param.fileName) {
          code.push('data.append(%s, yourAppInput.files[0], %s);', JSON.stringify(param.name), JSON.stringify(param.fileName))
        } else {
          const value = param.value !== undefined ? param.value.toString() : ''        
          code.push(
            'data.append(%s, %s);',
            JSON.stringify(param.name),
            JSON.stringify(value)
          )
        }
      })

      code.blank()

      reqOpts.data = '[data]'
      break

    default:
      if (source.postData.text) {
        reqOpts.data = source.postData.text
      }
  }

  code.push('const options = %s;', stringifyObject(reqOpts, { indent: '  ', inlineCharacterLimit: 80 }).replace("'[data]'", 'data'))
    .blank()
  code.push(util.format('axios.request(options).then(%s', 'function (response) {'))
    .push(1, 'console.log(response.data);')
    .push('}).catch(%s', 'function (error) {')
    .push(1, 'console.error(error);')
    .push('});')

  return code.join()
}

module.exports.info = {
  key: 'axios',
  title: 'Axios',
  link: 'https://github.com/axios/axios',
  description: 'Promise based HTTP client for the browser and node.js'
}
