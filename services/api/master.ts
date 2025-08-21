import { AdapterObject } from './index';
import queryString from 'query-string';

export default class Products {
  adapter: AdapterObject;

  constructor(adapter) {
    this.adapter = adapter;
  }

  getTestimonials() {
    return this.adapter.default.get('/testimonials');
  }

  getOccupations() {
    return this.adapter.default.get('/occupations');
  }

  getBookPages(params) {
    return this.adapter.default.get(`/book-pages?${queryString.stringify(params)}`);
  }

  getProvinces() {
    return this.adapter.default.get('/provinces');
  }
}
