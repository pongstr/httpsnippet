"use strict";

module.exports = function (obj, pair) {
  if (obj[pair.name] === undefined) {
    obj[pair.name] = pair.value;
    return obj;
  }

  // convert to array
  var arr = [obj[pair.name], pair.value];

  obj[pair.name] = arr;

  return obj;
};
