export const LOAD_OCCUPATIONS = 'LOAD_OCCUPATIONS';
export const LOAD_TESTIMONIALS = 'LOAD_TESTIMONIALS';
export const LOAD_BOOK_PAGES = 'LOAD_BOOK_PAGES';

interface Testimonial {
  name: string;
  company: string;
  message: string;
  image_url: string;
}

interface Occupation {
  name: string;
  description: string;
  page_count: number;
}

interface BookContent {
  value: string;
  style: string;
}

interface BookPage {
  order: number;
  occupation: Occupation;
  book_contens: BookContent[];
}

export interface MasterState {
  isFetching: boolean;
  testimonials: Testimonial[];
  occupations: Occupation[];
  bookPages: BookPage[];
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

export type MasterActionTypes = LoadTestimonials | LoadOccupations | LoadBookPages;
