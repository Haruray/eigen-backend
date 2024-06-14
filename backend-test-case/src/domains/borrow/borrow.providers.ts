import { Connection } from 'mongoose';
import { BorrowSchema } from 'src/database/schemas/borrow.schema';

export const borrowProviders = [
  {
    provide: 'BORROW_MODEL',
    useFactory: (connection): Connection =>
      connection.model('Borrow', BorrowSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
