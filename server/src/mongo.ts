import mongoose from 'mongoose';

export function connect() {
    const db_host = process.env.DB_HOST || '127.0.0.1';
    const db_port = process.env.DB_PORT || 27017;
    const db_name = process.env.DB_NAME || 'ngrx-test';
    mongoose.connect(`mongodb://${db_host}:${db_port}/${db_name}`).then(() => {
        console.log('connected to MongoDB');
    });
}
