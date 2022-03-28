const { omit, isObject } = require("lodash");

module.exports = {
  /**
   *
   * @param {Object} originalObject - The object from which the property needs to be removed
   * @param {string} propertyName - The name of the property to remove(case insensitive)
   * @returns the object without the property that was asked to remove
   */
  removeProperty: (originalObject, propertyName) => {
    if (!isObject(originalObject)) {
      throw new Error("originalObject must be an object.");
    }
    const key = Object.keys(originalObject).find(
      (key) => key.toLowerCase() === propertyName.toLowerCase()
    );
    if (key) {
      return omit(originalObject, key);
    } else {
      return originalObject;
    }
  },

  checkIfRequestContainsFile: (request) => {
    return (
      request.postData.mimeType === "multipart/form-data" &&
      request.postData.params.some((param) => param.fileName)
    );
  },
};
