import { AdapterObject } from './index';

export default class Products {
  adapter: AdapterObject;

  constructor(adapter) {
    this.adapter = adapter;
  }

  getTestimonials() {
    return this.adapter.default.get('/testimonials')
  }

  getOccupations() {
    return this.adapter.default.get('/occupations')
  }

  getBookPages() {
    return this.adapter.default.get('/book-pages')
  }

  getProvinces() {
    return this.adapter.default.get('/provinces')
  }

}
