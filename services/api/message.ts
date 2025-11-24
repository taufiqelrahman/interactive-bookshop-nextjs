import { AdapterObject } from './index';

export default class Products {
  adapter: AdapterObject;
  basePath: string;

  constructor(adapter: AdapterObject) {
    this.adapter = adapter;
    this.basePath = '/message';
  }

  send(data: any): Promise<void> {
    // return this.adapter.default.post(`${this.basePath}/send`, data);
    console.log({ data });
    return Promise.resolve();
  }
}
