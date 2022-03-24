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
const { removeProperty } = require('../../helpers/general')
const { constructAppendedParamsCode } = require('../../helpers/params')

module.exports = function (source, options) {
  const opts = Object.assign({
    indent: '  '
  }, options)

  let code = new CodeBuilder(opts.indent)


  code.push('import axios from "axios";')

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
    case 'application/json': {
      if (source.postData.jsonObj) {
        reqOpts.data = JSON.stringify(source.postData.jsonObj)
      }
      break
    }

    case 'application/x-www-form-urlencoded': {
      code.blank()
        .push('const encodedParams = new URLSearchParams();')
      
      code = constructAppendedParamsCode(code, source.postData.params, { isBrowser: true, dataVarName: 'encodedParams' })

      reqOpts.data = 'encodedParams'
      break
    }

    case 'multipart/form-data': {
      // when a web api's form-data is sent in a request, application/form-data media type is automatically inserted
      // into the headers with the right boundary
      reqOpts.headers = removeProperty(reqOpts.headers, 'content-type') 

      code.blank()
        .push('const data = new FormData();')

      code = constructAppendedParamsCode(code, source.postData.params, code, { isBrowser: true, dataVarName: 'data' })

      reqOpts.data = 'data'
      break
    }

    default: {
      if (source.postData.text) {
        reqOpts.data = source.postData.text
      }
    }
  }

  code.blank()
    .push('const options = %s;', stringifyObject(reqOpts, { indent: '  ', inlineCharacterLimit: 80 })
      .replace(/'encodedParams'/, 'encodedParams').replace(/'data'/, 'data'))
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
