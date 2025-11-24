declare module 'lodash.groupby' {
  function groupBy<T>(collection: T[], iteratee?: ((value: T) => any) | string): { [key: string]: T[] };

  export = groupBy;
}
