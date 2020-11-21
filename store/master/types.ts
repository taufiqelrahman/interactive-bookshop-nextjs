export const LOAD_OCCUPATIONS = 'LOAD_OCCUPATIONS';
export const LOAD_TESTIMONIALS = 'LOAD_TESTIMONIALS';
export const LOAD_BOOK_PAGES = 'LOAD_BOOK_PAGES';
export const LOAD_PROVINCES = 'LOAD_PROVINCES';

interface Testimonial {
  name: string;
  company: string;
  message: string;
  image_url: string;
}

export interface Occupation {
  id: number;
  name: string;
  description: string;
  page_count: number;
}

interface BookContent {
  value: string;
  style: string;
}

export interface BookPage {
  order: number;
  occupation: Occupation;
  book_contens: BookContent[];
  page_number: number;
}

export interface Province {
  name: string;
  code: string;
}

export interface MasterState {
  isFetching: boolean;
  testimonials: Testimonial[];
  occupations: Occupation[];
  bookPages: BookPage[];
  provinces: Province[];
}

interface LoadTestimonials {
  type: typeof LOAD_TESTIMONIALS;
  payload: Testimonial[] | undefined;
  isFetching: boolean;
}

interface LoadOccupations {
  type: typeof LOAD_OCCUPATIONS;
  payload: Occupation[] | undefined;
  isFetching: boolean;
}

interface LoadBookPages {
  type: typeof LOAD_BOOK_PAGES;
  payload: BookPage[] | undefined;
  isFetching: boolean;
}

interface LoadProvinces {
  type: typeof LOAD_PROVINCES;
  payload: Province[] | undefined;
  isFetching: boolean;
}

export type MasterActionTypes = LoadTestimonials | LoadOccupations | LoadBookPages | LoadProvinces;
