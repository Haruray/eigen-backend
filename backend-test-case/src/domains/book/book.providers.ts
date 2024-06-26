import { Connection } from 'mongoose';
import { BookSchema } from 'src/database/schemas/book.schema';

export const bookProviders = [
  {
    provide: 'BOOK_MODEL',
    useFactory: (connection): Connection =>
      connection.model('Book', BookSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
