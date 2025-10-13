import { BookPage, Occupation, Testimonial } from 'store/master/types';
import { AdapterObject } from './index';
import { BOOK_PAGES, OCCUPATIONS, TESTIMONIALS } from './__mocks__/master';

export default class Products {
  adapter: AdapterObject;

  constructor(adapter) {
    this.adapter = adapter;
  }

  getTestimonials(): Promise<{ data: { data: Testimonial[] } }> {
    // return this.adapter.default.get('/testimonials');
    return Promise.resolve({
      data: {
        data: TESTIMONIALS,
      },
    });
  }

  getOccupations(): Promise<{ data: { data: Occupation[] } }> {
    // return this.adapter.default.get('/occupations');
    return Promise.resolve({
      data: {
        data: OCCUPATIONS,
      },
    });
  }

  getBookPages(params): Promise<{ data: { data: BookPage[] } }> {
    // return this.adapter.default.get(`/book-pages?${queryString.stringify(params)}`);
    return Promise.resolve({
      data: {
        data: BOOK_PAGES,
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
