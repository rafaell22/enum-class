import Enum from "../../src";

describe('Test Enum class ', () => {
  describe('When creating new Enum and ', () => {
    test('no values are passed them throw error', () => {
      // @ts-expect-error
      expect(() => Enum.fromValues()).toThrow();
    });
  });
});
