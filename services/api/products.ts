import { AdapterObject } from './index';

export default class Products {
  adapter: AdapterObject;
  basePath: string;

  constructor(adapter) {
    this.adapter = adapter;
    this.basePath = '/products';
  }

  get() {
    // return this.adapter.default.get(`${this.basePath}`);
    return Promise.resolve({
      data: [
        { id: 1, name: 'Book 1', price: 100000 },
        { id: 2, name: 'Book 2', price: 150000 },
      ],
    });
  }

  show(slug) {
    // return this.adapter.default.get(`${this.basePath}/${slug}/slug`);
    return Promise.resolve({
      data: {
        id: 1,
        slug,
        name: `Book ${slug}`,
        price: 100000,
        description: 'Mock book description',
        stock: 10,
      },
    });
  }
}
