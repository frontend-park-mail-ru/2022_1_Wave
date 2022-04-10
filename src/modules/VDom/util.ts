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
    descriptor.value = function(...args: any) {
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
