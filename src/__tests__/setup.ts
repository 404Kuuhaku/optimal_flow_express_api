import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

// Set test environment variables
process.env.JWT_SECRET = 'test-secret-key';
process.env.NODE_ENV = 'test';

// Increase timeout for all tests
jest.setTimeout(30000); // 30 seconds

// Connect to the in-memory database before running tests
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

// Clear all test data after each test
afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});

// Disconnect and stop server after all tests
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
}); 