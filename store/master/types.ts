export const LOAD_OCCUPATIONS = 'LOAD_OCCUPATIONS';
export const LOAD_TESTIMONIALS = 'LOAD_TESTIMONIALS';

export interface Testimonial {
  name: string;
  company: string;
  message: string;
  image_url: string;
}

export interface Occupation {
  name: string;
  description: string;
  page_count: number;
}

export interface MasterState {
  isFetching: boolean;
  testimonials: Testimonial[];
  occupations: Occupation[];
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

export type MasterActionTypes = LoadTestimonials | LoadOccupations;
