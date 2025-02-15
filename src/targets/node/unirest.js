/**
 * @description
 * HTTP code snippet generator for Node.js using Unirest.
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

const CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  const opts = Object.assign({
    indent: '  '
  }, options)

  let includeFS = false
  const code = new CodeBuilder(opts.indent)

  code.push('const unirest = require("unirest");')
    .blank()
    .push('const req = unirest("%s", "%s");', source.method, source.url)
    .blank()

  if (source.cookies.length) {
    code.push('const CookieJar = unirest.jar();')

    source.cookies.forEach(function (cookie) {
      code.push('CookieJar.add("%s=%s","%s");', encodeURIComponent(cookie.name), encodeURIComponent(cookie.value), source.url)
    })

    code.push('req.jar(CookieJar);')
      .blank()
  }

  if (Object.keys(source.queryObj).length) {
    code.push('req.query(%s);', JSON.stringify(source.queryObj, null, opts.indent))
      .blank()
  }

  if (Object.keys(source.headersObj).length) {
    code.push('req.headers(%s);', JSON.stringify({...source.headersObj, useQueryString: true}, null, opts.indent))
      .blank()
  }

  switch (source.postData.mimeType) {
    case 'application/x-www-form-urlencoded':
      if (source.postData.paramsObj) {
        code.push('req.form(%s);', JSON.stringify(source.postData.paramsObj, null, opts.indent))
          .blank()
      }
      break

    case 'application/json':
      if (source.postData.jsonObj) {
        code.push('req.type("json");')
          .push('req.send(%s);', JSON.stringify(source.postData.jsonObj, null, opts.indent))
          .blank()
      }
      break

    case 'multipart/form-data': {
      const multipart = []

      source.postData.params.forEach(function (param) {
        const part = {}
        const { name } = param || 'body'
        if (param.fileName && !param.value) {
          includeFS = true

          part[name] = 'fs.createReadStream("' + param.fileName + '")'
        } else if (param.value) {

          part[name] = param.value
        }

        if (part[name]) {
          if (param.contentType) {
            part['content-type'] = param.contentType
          }

          multipart.push(part)
        }
      })
      code.push('req.multipart(%s);', JSON.stringify(multipart, null, opts.indent))
        .blank()
      break
    }

    default:
      if (source.postData.text) {
        code.push('req.send(%s);', JSON.stringify(source.postData.text, null, opts.indent))
          .blank()
      }
  }

  if (includeFS) {
    code.unshift('const fs = require("fs");')
  }

  code.push('req.end(function (res) {')
    .push(1, 'if (res.error) throw new Error(res.error);')
    .blank()
    .push(1, 'console.log(res.body);')
    .push('});')
    .blank()

  return code.join().replace(/"fs\.createReadStream\(\\"(.+)\\"\)"/, 'fs.createReadStream("$1")')
}

module.exports.info = {
  key: 'unirest',
  title: 'Unirest',
  link: 'http://unirest.io/nodejs.html',
  description: 'Lightweight HTTP Request Client Library'
}
