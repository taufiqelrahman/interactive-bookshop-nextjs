import { BookPage, Occupation } from 'store/master/types';

export const OCCUPATIONS = [
  { id: '1', name: 'Doctor', description: 'Heals patients', page_count: 5, indonesia: 'Dokter' },
  { id: '2', name: 'Chef', description: 'Cooks food', page_count: 3, indonesia: 'Koki' },
  { id: '3', name: 'Teacher', description: 'Educates students', page_count: 4, indonesia: 'Guru' },
  { id: '4', name: 'Astronaut', description: 'Explores space', page_count: 4, indonesia: 'Astronot' },
  { id: '5', name: 'Pilot', description: 'Flies planes', page_count: 4, indonesia: 'Pilot' },
  { id: '6', name: 'Police', description: 'Maintains law and order', page_count: 4, indonesia: 'Polisi' },
] as Occupation[];

export const BOOK_PAGES = [
  {
    occupation: { id: '1', name: 'Doctor', description: 'Heals patients', page_count: 5, indonesia: 'Dokter' },
    book_contents: [
      { value: 'Page 1 content', style: 'normal' },
      { value: 'Page 2 content', style: 'normal' },
    ],
    order: 1,
    occupation_id: 1,
    page_number: 1,
    englishText: 'Page 1 content',
    indonesiaText: 'Konten Halaman 1',
  },
  {
    occupation: { id: '2', name: 'Chef', description: 'Cooks food', page_count: 3, indonesia: 'Koki' },
    book_contents: [
      { value: 'Page 1 content', style: 'normal' },
      { value: 'Page 2 content', style: 'normal' },
    ],
    order: 2,
    occupation_id: 2,
    page_number: 2,
    englishText: 'Page 2 content',
    indonesiaText: 'Konten Halaman 2',
  },
  {
    occupation: {
      id: '3',
      name: 'Teacher',
      description: 'Educates students',
      page_count: 4,
      indonesia: 'Guru',
    },
    book_contents: [
      { value: 'Page 1 content', style: 'normal' },
      { value: 'Page 2 content', style: 'normal' },
    ],
    order: 3,
    occupation_id: 3,
    page_number: 3,
    englishText: 'Page 3 content',
    indonesiaText: 'Konten Halaman 3',
  },
  {
    occupation: {
      id: '4',
      name: 'Astronaut',
      description: 'Explores space',
      page_count: 4,
      indonesia: 'Astronot',
    },
    book_contents: [
      { value: 'Page 1 content', style: 'normal' },
      { value: 'Page 2 content', style: 'normal' },
    ],
    order: 4,
    occupation_id: 4,
    page_number: 4,
    englishText: 'Page 4 content',
    indonesiaText: 'Konten Halaman 4',
  },
  {
    occupation: {
      id: '5',
      name: 'Pilot',
      description: 'Flies planes',
      page_count: 4,
      indonesia: 'Pilot',
    },
    book_contents: [
      { value: 'Page 1 content', style: 'normal' },
      { value: 'Page 2 content', style: 'normal' },
    ],
    order: 5,
    occupation_id: 5,
    page_number: 5,
    englishText: 'Page 5 content',
    indonesiaText: 'Konten Halaman 5',
  },
  {
    occupation: {
      id: '6',
      name: 'Police',
      description: 'Maintains law and order',
      page_count: 4,
      indonesia: 'Polisi',
    },
    book_contents: [
      { value: 'Page 1 content', style: 'normal' },
      { value: 'Page 2 content', style: 'normal' },
    ],
    order: 6,
    occupation_id: 6,
    page_number: 6,
    englishText: 'Page 6 content',
    indonesiaText: 'Konten Halaman 6',
  },
] as BookPage[];
