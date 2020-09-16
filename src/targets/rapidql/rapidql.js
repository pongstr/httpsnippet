'use strict'

var util = require('util')
var stringifyObject = require('stringify-object')
var CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  var opts = Object.assign({
    indent: '  '
  }, options)

  var code = new CodeBuilder(opts.indent)

  code.push('// For more information about RapidQL, checkout docs.rapidql.com!')
      .push('')
      .blank()
  code.push('// For more information about RapidQL, checkout docs.rapidql.com!');
  code.push("const RapidQL = require('RapidQL');");
  code.push('let rql = new RapidQL({');
  code.push('});');
  code.push('');
  code.push('rql.query(`{');
  code.push(`  Http.${(source.method || '').toLowerCase()}(`);
  code.push(`    url:"${helpers.quote(source.fullUrl)}"`);

  if (source.headers.length) {
    lines.push(`    headers : {\n${Object.entries(source.allHeaders).map(([key, val]) => `"${key}":"${val}"`).join(",\n")}\n    }`);
  }

  // if (parameters.length) {
  //   appendComma(lines.length - 1);
  //   lines.push(`    form : {\n${parameters.join(",\n")}\n    }`);
  // }

  if (source?.postData?.text) {
    code.push(`    json: true,`)
    code.push(`    body: ${source?.postData?.text}`)
  }

  // builder.forPayload((payload) => {
  //   appendComma(lines.length - 1);
  //   if (payload.format === "JSON") {
  //     lines.push(`    json : true,`);
  //     lines.push(`    body : ${helpers.escapePayload(payload, true)}`);
  //   } else {
  //     lines.push(`    body : "${helpers.escapePayload(payload)}"`);
  //   }
  // });

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
