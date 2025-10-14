import { BookPage, Occupation, Province, Testimonial } from 'store/master/types';
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

  getProvinces(): Promise<{ data: { data: Province[] } }> {
    // return this.adapter.default.get('/provinces');
    return Promise.resolve({
      data: {
        data: [
          { code: 'jakarta', name: 'Jakarta' },
          { code: 'west-java', name: 'West Java' },
          { code: 'central-java', name: 'Central Java' },
          { code: 'east-java', name: 'East Java' },
          { code: 'bali', name: 'Bali' },
          { code: 'sumatra', name: 'Sumatra' },
          { code: 'kalimantan', name: 'Kalimantan' },
          { code: 'sulawesi', name: 'Sulawesi' },
          { code: 'papua', name: 'Papua' },
          { code: 'ntt', name: 'Nusa Tenggara Timur' },
          { code: 'ntb', name: 'Nusa Tenggara Barat' },
          { code: 'maluku', name: 'Maluku' },
          { code: 'aceh', name: 'Aceh' },
          { code: 'bengkulu', name: 'Bengkulu' },
          { code: 'jambi', name: 'Jambi' },
          { code: 'lampung', name: 'Lampung' },
          { code: 'riau', name: 'Riau' },
          { code: 'kepulauan-riau', name: 'Kepulauan Riau' },
          { code: 'bangka-belitung', name: 'Bangka Belitung' },
          { code: 'sumatera-utara', name: 'Sumatera Utara' },
          { code: 'sumatera-barat', name: 'Sumatera Barat' },
          { code: 'dki-jakarta', name: 'DKI Jakarta' },
          { code: 'yogyakarta', name: 'Yogyakarta' },
          { code: 'banten', name: 'Banten' },
          { code: 'west-sumatra', name: 'West Sumatra' },
          { code: 'south-sumatra', name: 'South Sumatra' },
          { code: 'north-sumatra', name: 'North Sumatra' },
          { code: 'west-kalimantan', name: 'West Kalimantan' },
          { code: 'south-kalimantan', name: 'South Kalimantan' },
          { code: 'east-kalimantan', name: 'East Kalimantan' },
          { code: 'central-kalimantan', name: 'Central Kalimantan' },
          { code: 'north-kalimantan', name: 'North Kalimantan' },
          { code: 'gorontalo', name: 'Gorontalo' },
          { code: 'north-sulawesi', name: 'North Sulawesi' },
          { code: 'central-sulawesi', name: 'Central Sulawesi' },
          { code: 'south-sulawesi', name: 'South Sulawesi' },
          { code: 'southeast-sulawesi', name: 'Southeast Sulawesi' },
          { code: 'west-sulawesi', name: 'West Sulawesi' },
          { code: 'maluku-utara', name: 'Maluku Utara' },
          { code: 'papua-barat', name: 'Papua Barat' },
          { code: 'papua-selatan', name: 'Papua Selatan' },
          { code: 'papua-tengah', name: 'Papua Tengah' },
        ] as Province[],
      },
    });
  }
}
