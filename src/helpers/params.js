module.exports = {
  /**
   *
   * @param {[Object]} params - List of params objects
   * @param {CodeBuilder} code - Code instance
   * @param {boolean} isBrowser - Boolean indicating if browser or other environment(e.g. node)
   * @param {string} dataVarName - The data object name
   * @param {string} method - Which method to invoke on the data object(e.g. append, set)
   * @returns New code with params inserted
   */
  constructAppendedParamsCode: (
    params,
    code,
    isBrowser = false,
    dataVarName = "data",
    method = "append"
  ) => {
    params.forEach(function (param) {
      let value =
        param.value !== undefined ? JSON.stringify(param.value.toString()) : "";
      if (param.fileName) {
        value = isBrowser
          ? `yourAppInput.files[0], ${JSON.stringify(param.fileName)}`
          : `fs.createReadStream("/PATH/TO/${param.fileName}")`;
      }
      code.push(
        "%s.%s(%s, %s);",
        dataVarName,
        method,
        JSON.stringify(param.name),
        value
      );
    });

    return code;
  },
};
