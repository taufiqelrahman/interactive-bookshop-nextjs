export interface Testimonial {
  id: string | number;
  name: string;
  company: string;
  message: string;
  image_url: string;
}

export interface Occupation {
  id: string;
  name: string;
  description: string;
  indonesia: string;
}

export interface BookPage {
  occupation: Occupation;
  occupation_id: number;
  page_number: number;
  style: string;
  englishText: string;
  indonesiaText: string;
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
