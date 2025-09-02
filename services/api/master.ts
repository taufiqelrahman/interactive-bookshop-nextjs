import { BookPage, Occupation } from 'store/master/types';
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

  getOccupations(): Promise<{ data: { data: Occupation[] } }> {
    // return this.adapter.default.get('/occupations');
    return Promise.resolve({
      data: {
        data: [
          { id: '1', name: 'Doctor', description: 'Heals patients', page_count: 5, indonesia: 'Dokter' },
          { id: '2', name: 'Chef', description: 'Cooks food', page_count: 3, indonesia: 'Koki' },
          { id: '3', name: 'Teacher', description: 'Educates students', page_count: 4, indonesia: 'Guru' },
          { id: '4', name: 'Astronaut', description: 'Explores space', page_count: 4, indonesia: 'Astronot' },
          { id: '5', name: 'Pilot', description: 'Flies planes', page_count: 4, indonesia: 'Pilot' },
          { id: '6', name: 'Police', description: 'Maintains law and order', page_count: 4, indonesia: 'Polisi' },
        ] as Occupation[],
      },
    });
  }

  getBookPages(params): Promise<{ data: { data: BookPage[] } }> {
    // return this.adapter.default.get(`/book-pages?${queryString.stringify(params)}`);
    return Promise.resolve({
      data: {
        data: [
          {
            occupation: { id: '1', name: 'Doctor', description: 'Heals patients', page_count: 5, indonesia: 'Dokter' },
            book_contens: [
              { value: 'Page 1 content', style: 'normal' },
              { value: 'Page 2 content', style: 'normal' },
            ],
            order: 1,
          },
          {
            occupation: { id: '2', name: 'Chef', description: 'Cooks food', page_count: 3, indonesia: 'Koki' },
            book_contens: [
              { value: 'Page 1 content', style: 'normal' },
              { value: 'Page 2 content', style: 'normal' },
            ],
            order: 2,
          },
          {
            occupation: {
              id: '3',
              name: 'Teacher',
              description: 'Educates students',
              page_count: 4,
              indonesia: 'Guru',
            },
            book_contens: [
              { value: 'Page 1 content', style: 'normal' },
              { value: 'Page 2 content', style: 'normal' },
            ],
            order: 3,
          },
          {
            occupation: {
              id: '4',
              name: 'Astronaut',
              description: 'Explores space',
              page_count: 4,
              indonesia: 'Astronot',
            },
            book_contens: [
              { value: 'Page 1 content', style: 'normal' },
              { value: 'Page 2 content', style: 'normal' },
            ],
            order: 4,
          },
          {
            occupation: {
              id: '5',
              name: 'Pilot',
              description: 'Flies planes',
              page_count: 4,
              indonesia: 'Pilot',
            },
            book_contens: [
              { value: 'Page 1 content', style: 'normal' },
              { value: 'Page 2 content', style: 'normal' },
            ],
            order: 5,
          },
          {
            occupation: {
              id: '6',
              name: 'Police',
              description: 'Maintains law and order',
              page_count: 4,
              indonesia: 'Polisi',
            },
            book_contens: [
              { value: 'Page 1 content', style: 'normal' },
              { value: 'Page 2 content', style: 'normal' },
            ],
            order: 6,
          },
        ] as BookPage[],
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
