import { AdapterObject } from './index';

export default class Products {
  adapter: AdapterObject;
  basePath: string;

  constructor(adapter: AdapterObject) {
    this.adapter = adapter;
    this.basePath = '/products';
  }

  get() {
    return this.adapter.default.get(`${this.basePath}`)
  }

  show(slug: string) {
    return this.adapter.default.get(`${this.basePath}/${slug}/slug`)
  }
}
