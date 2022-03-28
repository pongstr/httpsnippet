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

    it("insensitive case property removed from object successfully", () => {
      const obj = { a: 1, b: 2 };
      const result = removeProperty(obj, "B");

      result.should.deepEqual(omit(obj, "b"));
    });
  });

  describe("Test constructAppendedParamsCode helper", () => {
    const fakeParams = [
      { name: "a", value: "1" },
      { name: "b", value: "2" },
    ];

    it("called with invalid code argument", () => {
      (function () {
        constructAppendedParamsCode({}, []);
      }.should.throw(
        new Error("code argument must be an instance of CodeBuilder")
      ));
    });

    it("called with invalid params argument", () => {
      (function () {
        constructAppendedParamsCode(new CodeBuilder(), {});
      }.should.throw(new Error("params argument must be an array")));
    });

    describe("called with multiple options variations", () => {
      const fakeParamsWithFile = [
        ...fakeParams,
        { name: "a", fileName: "fakeFileName" },
      ];
      const lastIndex = params.length - 1;

      it("called with file param and false isBrowser option", () => {
        const result = constructAppendedParamsCode(
          new CodeBuilder(),
          fakeParamsWithFile,
          {
            isBrowser: false,
          }
        );

        result.should.be.an.instanceof(CodeBuilder);
        result
          .join()
          .should.containEql(
            `fs.createReadStream("/PATH/TO/${fakeParamsWithFile[lastIndex].fileName}")`
          );
      });

      it("called with file param and true isBrowser option", () => {
        const result = constructAppendedParamsCode(
          new CodeBuilder(),
          fakeParamsWithFile,
          {
            isBrowser: true,
          }
        );

        result.should.be.an.instanceof(CodeBuilder);
        result
          .join()
          .should.containEql(
            `yourAppInput.files[0], ${JSON.stringify(
              params[lastIndex].fileName
            )}`
          );
      });

      it("called with dataVarName option", () => {
        const result = constructAppendedParamsCode(new CodeBuilder(), params, {
          dataVarName: "dataObject",
        });

        result.should.be.an.instanceof(CodeBuilder);
        result.join().should.containEql("dataObject.append");
      });
    });

    it("returned new code object with two params", () => {
      const result = constructAppendedParamsCode(new CodeBuilder(), fakeParams);

      result.should.be.an.instanceof(CodeBuilder);
      result.getLength().should.equal(2);
      result
        .join()
        .should.equal('data.append("a", "1");\ndata.append("b", "2");');
    });
  });
});
