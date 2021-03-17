/* eslint-disable @typescript-eslint/camelcase */
import Faker from 'faker';

interface Testimonial {
  message: string;
  name: string;
  image_url: string;
  company: string;
}

export const testimonialMock: Testimonial = {
  message: Faker.lorem.sentence(),
  name: Faker.name.findName(),
  image_url: Faker.image.imageUrl(),
  company: Faker.company.companyName(),
};

export const testimonialsMock: Testimonial[] = [testimonialMock, testimonialMock, testimonialMock];
