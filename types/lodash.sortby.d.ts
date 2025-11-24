declare module 'lodash.sortby' {
  function sortBy<T>(
    collection: T[],
    iteratees?: ((value: T) => any) | string | Array<((value: T) => any) | string>,
  ): T[];

  export = sortBy;
}
