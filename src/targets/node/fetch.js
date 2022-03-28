/**
 * @description
 * HTTP code snippet generator for Node.js using node-fetch.
 *
 * @author
 * @hirenoble
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

const stringifyObject = require('stringify-object')
const CodeBuilder = require('../../helpers/code-builder')
const { removeProperty, checkIfRequestContainsFile } = require('../../helpers/general')
const { constructAppendedParamsCode } = require('../../helpers/params')

module.exports = function (source, options) {
  const opts = Object.assign({
    indent: '  '
  }, options)

  let code = new CodeBuilder(opts.indent)

  if (checkIfRequestContainsFile(source)) {
    code.push('const fs = require("fs");')
  }

  code.push('const fetch = require(\'node-fetch\');')
  const url = source.fullUrl
  const reqOpts = {
    method: source.method
  }

  if (Object.keys(source.headersObj).length) {
    reqOpts.headers = source.headersObj
  }

  switch (source.postData.mimeType) {
    case 'application/json': {
      if (source.postData.jsonObj) {
        reqOpts.body = JSON.stringify(source.postData.jsonObj)
      }
      break
    }

    case 'application/x-www-form-urlencoded': {
      code.blank()
        .push('const encodedParams = new URLSearchParams();')

      code = constructAppendedParamsCode(code, source.postData.params, { isBrowser: false, dataVarName: 'encodedParams' })

      reqOpts.body = 'encodedParams'
      break
    }

    case 'multipart/form-data': {
      // content-type header will come from the data.getHeaders() with the right boundary
      reqOpts.headers = removeProperty(reqOpts.headers, 'content-type')
      reqOpts.headers.placeholderGetHeaders = 'placeholderGetHeaders'

      code.unshift('const FormData = require(\'form-data\');')
      code.blank()
        .push('const data = new FormData();')

      code = constructAppendedParamsCode(code, source.postData.params, { isBrowser: false, dataVarName: 'data' })

      reqOpts.body = 'data'
      break
    }

    default: {
      if (source.postData.text) {
        reqOpts.body = source.postData.text
      }
    }
  }

  // construct cookies argument
  if (source.cookies.length) {
    let cookies = ''
    source.cookies.forEach(function (cookie) {
      cookies = cookies + encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value) + '; '
    })
    if (reqOpts.headers) {
      reqOpts.headers.cookie = cookies
    } else {
      reqOpts.headers = {}
      reqOpts.headers.cookie = cookies
    }
  }
  code.blank()
  code.push('const url = \'' + url + '\';')
    .blank()
    .push('const options = %s;', stringifyObject(reqOpts, { indent: '  ', inlineCharacterLimit: 80 })
      .replace(/'encodedParams'/, 'encodedParams').replace(/'data'/, 'data')
      .replace("placeholderGetHeaders: 'placeholderGetHeaders'", '...data.getHeaders()'))
    .blank()
    .push('fetch(url, options)')
    .push(1, '.then(res => res.json())')
    .push(1, '.then(json => console.log(json))')
    .push(1, '.catch(err => console.error(\'error:\' + err));')

  return code.join()
}

module.exports.info = {
  key: 'fetch',
  title: 'Fetch',
  link: 'https://github.com/bitinn/node-fetch',
  description: 'Simplified HTTP node-fetch client'
}
