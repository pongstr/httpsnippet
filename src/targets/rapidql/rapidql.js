'use strict'

var util = require('util')
var stringifyObject = require('stringify-object')
var CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  var opts = Object.assign({
    indent: '  '
  }, options)

  var code = new CodeBuilder(opts.indent)

  code.push('// For more information about RapidQL, checkout docs.rapidql.com!');
  code.push('');
  code.blank();
  code.push("const RapidQL = require('RapidQL');");
  code.push('let rql = new RapidQL({');
  code.push('});');
  code.push('');
  code.push('rql.query(`{');
  code.push(`  Http.${(source.method || '').toLowerCase()}(`);
  code.push(`    url:"${source.fullUrl}"`);

  if (source.headers.length) {
    code.push(`    headers : {\n${Object.entries(source.allHeaders).map(([key, val]) => `"${key}":"${val}"`).join(",\n")}\n    }`);
  }


  if (source.postData.jsonObj) {
    code.push(`    json: true,`)
    code.push(`    body: ${source.postData.text}`)
  } else if(source.postData.params) {
    code.push(`    form : {\n${source.postData.params.map(param => `"${param.name}":"${param.value}"`).join(",\n")}\n    }`);
  } else {
    code.push(`    body : ${source.postData.text}`);
  }

  code.push("  ) {");
  code.push("");
  code.push("  }");
  code.push("}`)");
  code.push(".then((res) => console.log(res))");
  code.push(".catch((err) => console.log(err));");

  return code.join();
}

module.exports.info = {
  key: 'rapidql',
  title: 'RapidQL',
  link: 'https://github.com/RapidAPI/rapidql',
  description: ''
}
