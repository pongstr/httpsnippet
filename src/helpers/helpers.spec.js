const { omit } = require("lodash");
const should = require("should");
const CodeBuilder = require("./code-builder");

const { removeProperty } = require("./general");
const { constructAppendedParamsCode } = require("./params");

describe("Test helpers methods", () => {
  describe("Test RemoveProperty helper", () => {
    it("RemoveProperty called with invalid params", () => {
      (function () {
        removeProperty("str", "property");
      }.should.throw(new Error("originalObject must be an object.")));
    });

    it("returned object stayed the same if a non existing property name sent", () => {
      const obj = { a: 1, b: 2 };
      const result = removeProperty(obj, "c");

      result.should.equal(obj);
    });
    it("property removed from object successfully", () => {
      const obj = { a: 1, b: 2 };
      const result = removeProperty(obj, "b");

      result.should.deepEqual(omit(obj, "b"));
    });
  });

  describe("Test constructAppendedParamsCode helper", () => {
    it("constructAppendedParamsCode called with invalid code argument", () => {
      (function () {
        constructAppendedParamsCode({}, []);
      }.should.throw(
        new Error("code argument must be an instance of CodeBuilder")
      ));
    });

    it("constructAppendedParamsCode called with invalid params argument", () => {
      (function () {
        constructAppendedParamsCode(new CodeBuilder(), {});
      }.should.throw(new Error("params argument must be an array")));
    });

    it("returned new code object with two params", () => {
      const params = [{ value: "1" }, { value: "2" }];
      const result = constructAppendedParamsCode(new CodeBuilder(), params);

      result.should.be.an.instanceof(CodeBuilder);
      result.getLength().should.equal(2);
    });
  });
});
