import Enum, { EnumType } from "../../src/index.js";

describe('Test Enum class ', () => {
  describe('When creating new Enum and ', () => {
    test('no values are passed then throw error', () => {
      // @ts-expect-error
      expect(() => Enum.fromValues()).toThrow();
      expect(() => Enum.fromValues({})).toThrow();
    });

    test('non-string values are passed as argument then throw error', () => {
      // @ts-expect-error
      expect(() => Enum.fromValues(1, 2)).toThrow();
      // @ts-expect-error
      expect(() => Enum.fromValues({}, {})).toThrow();
      // @ts-expect-error
      expect(() => Enum.fromValues([])).toThrow();
      // @ts-expect-error
      expect(() => Enum.fromValues(() => {})).toThrow();
      // @ts-expect-error
      expect(() => Enum.fromValues(true, false)).toThrow();
    });

    test('string values are passed then create Enum', () => {
      const myEnum: EnumType = Enum.fromValues('a', 'b', 'c');

      expect(myEnum.length).toBe(3);
      expect(myEnum.A).toBeDefined();
      expect(myEnum.B).toBeDefined();
      expect(myEnum.C).toBeDefined();
    });

    test('two enums with same keys are created then they will be different', () => {
      const myEnum1: EnumType = Enum.fromValues('a', 'b', 'c');
      const myEnum2: EnumType = Enum.fromValues('a', 'b', 'c');

      expect(myEnum1.A).not.toBe(myEnum2.A);
      expect(myEnum1.B).not.toBe(myEnum2.B);
      expect(myEnum1.C).not.toBe(myEnum2.C);
    });
  });
});
