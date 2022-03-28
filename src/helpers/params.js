const { isArray } = require("lodash");

const CodeBuilder = require("./code-builder");

const defaultConstructParamsCodeOptions = {
  isBrowser: false,
  dataVarName: "data",
};

module.exports = {
  /**
   *
   * @param {CodeBuilder} code - Original codeBuilder instance
   * @param {[Object]} params - List of params objects
   * * @param {Objects} options
   * @param {boolean} options.isBrowser - Boolean indicating if browser or other environment(e.g. node)
   * @param {string} options.dataVarName - The data object name
   * @returns New code instance with params appended to the supplied data object
   */
  constructAppendedParamsCode: (
    code,
    params = [],
    options = defaultConstructParamsCodeOptions
  ) => {
    if (!(code instanceof CodeBuilder)) {
      throw new Error("code argument must be an instance of CodeBuilder");
    } else if (!isArray(params)) {
      throw new Error("params argument must be an array");
    }

    const { isBrowser = false, dataVarName = "data" } = options;
    const newCode = code.clone();

    params.forEach(function (param) {
      let value =
        param.value !== undefined ? JSON.stringify(param.value.toString()) : "";
      if (param.fileName) {
        value = isBrowser
          ? `yourAppInput.files[0], ${JSON.stringify(param.fileName)}`
          : `fs.createReadStream("/PATH/TO/${param.fileName}")`;
      }
      newCode.push(
        "%s.append(%s, %s);",
        dataVarName,
        JSON.stringify(param.name),
        value
      );
    });

    return newCode;
  },
};
