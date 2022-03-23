/**
 * @description
 * HTTP code snippet generator for fetch
 *
 * @author
 * @pmdroid
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

const stringifyObject = require('stringify-object')
const CodeBuilder = require('../../helpers/code-builder')
const { removeProperty } = require('../../helpers/general')
const { constructAppendedParamsCode } = require('../../helpers/params')

module.exports = function (source, options) {
  const opts = Object.assign(
    {
      indent: '  ',
      credentials: null
    },
    options
  )

  let code = new CodeBuilder(opts.indent)

  options = {
    method: source.method
  }

  if (Object.keys(source.allHeaders).length) {
    options.headers = source.allHeaders
  }

  if (opts.credentials !== null) {
    options.credentials = opts.credentials
  }

  switch (source.postData.mimeType) {
    case 'application/json': {
      options.body = JSON.stringify(source.postData.jsonObj)
      break
    }

    case 'application/x-www-form-urlencoded': {
      code.push('const encodedParams = new URLSearchParams();')
      code = constructAppendedParamsCode(source.postData.params, code, true, 'encodedParams')
      code.blank();

      options.body = 'encodedParams'
      break
    }

    case 'multipart/form-data': {
      // when a web api's form-data is sent in a request, application/form-data media type is automatically inserted
      // into the headers with the right boundary
      options.headers = removeProperty(options.headers, 'content-type') 

      code.push('const data = new FormData();')
      code = constructAppendedParamsCode(source.postData.params, code, true, 'data')
      code.blank()

      options.body = 'data';
      break
    }

    default: {
      if (source.postData.text) {
        options.body = source.postData.text
      }
    }
  }

  code.push('const options = %s;', stringifyObject(options, { indent: opts.indent, inlineCharacterLimit: 80 })
      .replace(/'encodedParams'/, 'encodedParams').replace(/'data'/, 'data'))
    .blank()

  code.push("fetch('%s', options)", source.fullUrl)
    .push(1, '.then(response => response.json())')
    .push(1, '.then(response => console.log(response))')
    .push(1, '.catch(err => console.error(err));')

  return code.join()
}

module.exports.info = {
  key: 'fetch',
  title: 'fetch',
  link: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
  description: 'Perform asynchronous HTTP requests with the Fetch API'
}
