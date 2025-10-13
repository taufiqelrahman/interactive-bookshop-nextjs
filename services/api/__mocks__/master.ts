import { BookPage, Occupation, Testimonial } from 'store/master/types';

export const OCCUPATIONS = [
  { id: '1', name: 'Doctor', description: 'Heals patients', indonesia: 'Dokter' },
  { id: '2', name: 'Chef', description: 'Cooks food', indonesia: 'Koki' },
  { id: '3', name: 'Teacher', description: 'Educates students', indonesia: 'Guru' },
  { id: '4', name: 'Astronaut', description: 'Explores space', indonesia: 'Astronot' },
  { id: '5', name: 'Pilot', description: 'Flies planes', indonesia: 'Pilot' },
  { id: '6', name: 'Police', description: 'Maintains law and order', indonesia: 'Polisi' },
] as Occupation[];

export const BOOK_PAGES = [
  {
    occupation: {
      id: '1',
      name: 'Front Cover',
    },
    occupation_id: 1,
    page_number: 1,
    englishText: 'When [name] Grows Up',
    indonesiaText: 'When [name] Grows Up',
    style: '{"top": "15%","color": "white","fontWeight": "bolder"}',
  },
  {
    occupation: { id: '1', name: 'intro', description: 'Heals patients' },
    occupation_id: 2,
    page_number: 1,
    englishText: 'Lorem ipsum dolor sit amet',
    indonesiaText: 'Contoh teks bahasa Indonesia',
  },
  {
    occupation: { id: '1', name: 'intro', description: 'Heals patients' },
    occupation_id: 2,
    page_number: 2,
    englishText: 'Lorem ipsum dolor sit amet',
    indonesiaText: 'Contoh teks bahasa Indonesia',
  },
  {
    occupation: { id: '1', name: 'intro', description: 'Heals patients' },
    occupation_id: 2,
    page_number: 3,
    englishText: 'Lorem ipsum dolor sit amet',
    indonesiaText: 'Contoh teks bahasa Indonesia',
  },
  {
    occupation: { id: '1', name: 'intro', description: 'Heals patients' },
    occupation_id: 2,
    page_number: 4,
    englishText: 'Lorem ipsum dolor sit amet',
    indonesiaText: 'Contoh teks bahasa Indonesia',
  },
  {
    occupation: OCCUPATIONS[0],
    occupation_id: 3,
    page_number: 1,
    englishText: 'Lorem ipsum dolor sit amet',
    indonesiaText: 'Contoh teks bahasa Indonesia',
  },
  {
    occupation: OCCUPATIONS[0],
    occupation_id: 3,
    page_number: 2,
    englishText: 'Lorem ipsum dolor sit amet',
    indonesiaText: 'Contoh teks bahasa Indonesia',
  },
  {
    occupation: OCCUPATIONS[1],
    occupation_id: 4,
    page_number: 1,
    englishText: 'Lorem ipsum dolor sit amet',
    indonesiaText: 'Contoh teks bahasa Indonesia',
  },
  {
    occupation: OCCUPATIONS[1],
    occupation_id: 4,
    page_number: 2,
    englishText: 'Lorem ipsum dolor sit amet',
    indonesiaText: 'Contoh teks bahasa Indonesia',
  },
  {
    occupation: OCCUPATIONS[2],
    occupation_id: 5,
    page_number: 1,
    englishText: 'Lorem ipsum dolor sit amet',
    indonesiaText: 'Contoh teks bahasa Indonesia',
  },
  {
    occupation: OCCUPATIONS[2],
    occupation_id: 5,
    page_number: 2,
    englishText: 'Lorem ipsum dolor sit amet',
    indonesiaText: 'Contoh teks bahasa Indonesia',
  },
] as BookPage[];

export const TESTIMONIALS = [
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
] as Testimonial[];
