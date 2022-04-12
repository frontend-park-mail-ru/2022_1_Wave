interface Decorator {
  // eslint-disable-next-line no-unused-vars
  (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor;
}

export function Debounce(ms: number): Decorator {
  let timeoutID: NodeJS.Timeout | null = null;

  // eslint-disable-next-line func-names
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const originalFunc = descriptor.value;

    // eslint-disable-next-line no-param-reassign
    descriptor.value = function (...args: any) {
      if (timeoutID != null) {
        clearTimeout(timeoutID);
      }

      timeoutID = setTimeout((): void => {
        originalFunc.apply(this, args);
      }, ms);
    };

    return descriptor;
  };
}

/**
 * Merges specified objects into one
 * @param {...Object}
 * objs - objects to merge
 * @returns {Object}
 * Returns merged object
 * @example
 * zip({ name: 'a'}, {age: 5 });
 * // returns { name: 'a', age: '5' }
 * @example
 * zip({});
 * // returns {}
 * @example
 * zip({}, question: 'why?');
 * // returns { question: 'why?' }
 * @example
 * zip({question: 'why?'}, {question: 'who?'});
 * // returns { question: 'why?' }
 */
export const zip = (...objs: object[]): any => {
  if (objs.length <= 0) {
    throw new Error('Nothing to merge');
  }

  return objs.reduce((acc, cur) => ({ ...cur, ...acc }), {});
};
