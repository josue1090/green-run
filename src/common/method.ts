type noTryCatch = <T>(promise: Promise<T>) => Promise<[Error | undefined, T]>;

/**
 * Method used to replace try catch statements, the reason behind it
 * is to not create scope variables inside a try catch block.
 */
export const noTryCatch: noTryCatch = <T>(promise: Promise<T>): Promise<[Error | undefined, T]> => promise
  .then<[undefined, T]>((data: T) => [undefined, data])
  // tslint:disable-next-line: no-any
  .catch<[Error, any]>((error: Error) => [error, undefined]);
