import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: () =>
      mongoose.connect(
        'mongodb+srv://admin:admin@cluster0.xchjyb3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      ),
  },
];
