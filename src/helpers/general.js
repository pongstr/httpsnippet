const { omit } = require("lodash");

module.exports = {
  /**
   *
   * @param {Object} originalObject - The object from which the property needs to be removed
   * @param {string} propertyName - The name of the property to remove(case insensitive)
   * @returns the object without the property that was asked to remove
   */
  removeProperty: (originalObject, propertyName) => {
    const key = Object.keys(originalObject).find(
      (key) => key.toLowerCase() === propertyName.toLowerCase()
    );
    if (key) {
      return omit(originalObject, key);
    } else {
      console.warn(`Property with name ${propertyName} was not found`);
      return originalObject;
    }
  },
};
