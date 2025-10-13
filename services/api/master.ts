import { BookPage, Occupation, Testimonial } from 'store/master/types';
import { AdapterObject } from './index';
import { BOOK_PAGES, OCCUPATIONS } from './__mocks__/master';

export default class Products {
  adapter: AdapterObject;

  constructor(adapter) {
    this.adapter = adapter;
  }

  getTestimonials(): Promise<{ data: { data: Testimonial[] } }> {
    // return this.adapter.default.get('/testimonials');
    return Promise.resolve({
      data: {
        data: [
          {
            id: 1,
            name: 'Sarah Johnson',
            company: 'Parent of Emma, Age 6',
            message:
              'This personalized book made my daughter feel like the hero of her own adventure. She asks to read it every night!',
            image_url: '/static/images/testimonial-1.jpg',
          },
          {
            id: 2,
            name: 'Michael Chen',
            company: 'Father of two',
            message: 'Amazing quality and storytelling. My kids love seeing themselves in the book. Highly recommend!',
            image_url: '/static/images/testimonial-2.jpg',
          },
        ] as Testimonial[],
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
