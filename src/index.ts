import toUpperSnakeCase from '@rafaell22/to-upper-snake-case';

export type EnumOptions = {
  useStrValues?: boolean;
  useIntValues?: boolean;
  useValuesAsKeys?: boolean; 
};

export type EnumType = {[ key: string ]: Symbol | string | number};

/**
 * By default the function uses a Symbol as the enum value. To change that, use the available options: 
 *   - useStrValues - use UPPER_SNAKE_CASE as keyand keep original string as value
 *   - useIntValues - use UPPER_SNAKE_CASE as key and integer sequential as values
 *   - useValuesAsKeys - use the string values passes as the enum keys
 * @throws
 */
export default class Enum {
  private constructor() {}

  public static fromValues(enumOptions: string | EnumOptions, ...values: string[]): EnumType {
    if(
      !enumOptions &&
      values.length === 0
    ) {
      throw new Error('Cannot create empty enum');
    }

    if(typeof enumOptions === 'string') {
      values.push(enumOptions);
      enumOptions = {};
    }

    const enumInstance = {};
    const enumKeys: string[] = [];
    for(const value of values) {
      if(typeof value !== 'string') {
        throw new Error(`Invalid value in enum: ${value}`);
      }

      const snakeCaseValue = toUpperSnakeCase(value);
      enumKeys.push(snakeCaseValue);

      let enumValue: Symbol | string | number = Symbol(value);
      if(enumOptions.useStrValues) {
        enumValue = value;
      }
      if(enumOptions.useIntValues) {
        enumValue = enumKeys.length - 1;
      }

      Object.defineProperty(enumInstance, snakeCaseValue, {
        enumerable: true,
        get: ((enumValue: Symbol | string | number) => enumValue).bind(enumInstance, enumValue),
        set() { throw new Error('Can\'t set property of Enum') },
      });
    }

    Object.defineProperty(enumInstance, 'values', {
      enumerable: false,
      get: (function(/** @type {string[]} */ values){ return values }).bind(enumInstance, enumKeys),
      set() { throw new Error('Can\'t set property of Enum') },
    })

    Object.defineProperty(enumInstance, 'length', {
      enumerable: false,
      get: (function( /** @type {number} */ length) { return length }).bind(enumInstance, enumKeys.length),
      set() { throw new Error('Can\'t set Enum\'s length') },
    })


    Object.freeze(enumInstance);
    return enumInstance;
  }
};
