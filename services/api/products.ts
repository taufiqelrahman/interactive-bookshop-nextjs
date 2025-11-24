import { Product } from 'store/products/types';
import { AdapterObject } from './index';

export default class Products {
  adapter: AdapterObject;
  basePath: string;

  constructor(adapter: AdapterObject) {
    this.adapter = adapter;
    this.basePath = '/products';
  }

  get(): Promise<{ data: { data: Product[] } }> {
    // return this.adapter.default.get(`${this.basePath}`);
    return Promise.resolve({
      data: {
        data: [
          {
            id: 1,
            name: 'Adventure Heroes Book',
            description: 'A personalized adventure book where your child becomes the brave hero on an exciting quest.',
            short_description: 'Personalized adventure book',
            price: 100000,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_at: '',
            images: [
              {
                id: 1,
                product_id: 1,
                description: 'Book cover',
                filepath: '/static/images/adventure-book-cover.jpg',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
            ],
          },
          {
            id: 2,
            name: 'Space Explorer Book',
            description:
              'Join your child on an amazing journey through space as they explore planets and meet friendly aliens.',
            short_description: 'Personalized space exploration book',
            price: 150000,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_at: '',
            images: [
              {
                id: 2,
                product_id: 2,
                description: 'Book cover',
                filepath: '/static/images/space-book-cover.jpg',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
            ],
          },
        ] as Product[],
      },
    });
  }

  show(slug: any): Promise<{ data: { data: Product } }> {
    // return this.adapter.default.get(`${this.basePath}/${slug}/slug`);
    return Promise.resolve({
      data: {
        data: {
          id: 1,
          name: `Book ${slug}`,
          description:
            "A personalized children's book that makes your child the hero of their own adventure. Beautifully illustrated and customized with their name, appearance, and favorite activities.",
          short_description: "Personalized children's book with custom character",
          price: 100000,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: '',
          images: [
            {
              id: 1,
              product_id: 1,
              description: 'Book cover image',
              filepath: '/static/images/book-cover-1.jpg',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            {
              id: 2,
              product_id: 1,
              description: 'Sample page',
              filepath: '/static/images/book-page-1.jpg',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ],
        } as Product,
      },
    });
  }
}
