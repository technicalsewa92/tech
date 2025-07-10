declare module 'fuse.js' {
  export interface FuseOptions<T> {
    keys: (keyof T | string)[];
    threshold?: number;
    [key: string]: any;
  }

  export interface FuseResult<T> {
    item: T;
    refIndex: number;
    score?: number;
    matches?: any[];
  }

  export default class Fuse<T> {
    constructor(list: T[], options?: FuseOptions<T>);
    search(pattern: string | Fuse.FuseQuery<T>): FuseResult<T>[];
    setCollection(list: T[]): void;
    add(item: T): void;
    remove(predicate: (item: T) => boolean): void;
    getIndex(): any;
    static createIndex<T>(options: FuseOptions<T>, list: T[]): any;
  }

  export namespace Fuse {
    export interface FuseQuery<T> {
      $and?: FuseQuery<T>[];
      $or?: FuseQuery<T>[];
      [key: string]: any;
    }
  }
}
