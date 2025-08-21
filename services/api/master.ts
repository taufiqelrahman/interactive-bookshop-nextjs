import { AdapterObject } from './index';
import queryString from 'query-string';

export default class Products {
  adapter: AdapterObject;

  constructor(adapter) {
    this.adapter = adapter;
  }

  getTestimonials() {
    // return this.adapter.default.get('/testimonials');
    return Promise.resolve({
      data: {
        data: [
          { id: 1, name: 'User 1', message: 'Great book!' },
          { id: 2, name: 'User 2', message: 'My kids love it.' },
        ],
      },
    });
  }

  getOccupations() {
    // return this.adapter.default.get('/occupations');
    return Promise.resolve({
      data: {
        data: [
          { id: 1, name: 'Doctor' },
          { id: 2, name: 'Teacher' },
        ],
      },
    });
  }

  getBookPages(params) {
    // return this.adapter.default.get(`/book-pages?${queryString.stringify(params)}`);
    return Promise.resolve({
      data: {
        data: [
          { id: 1, content: 'Page 1 content' },
          { id: 2, content: 'Page 2 content' },
        ],
        ...params,
      },
    });
  }

  getProvinces() {
    // return this.adapter.default.get('/provinces');
    return Promise.resolve({
      data: {
        data: [
          { id: 1, name: 'Jakarta' },
          { id: 2, name: 'West Java' },
        ],
      },
    });
  }
}
