import request from 'supertest';
import app from '../app';
import UserModel from '../models/userModel';
import mongoose from 'mongoose';

describe('Transfer API', () => {
    let user1Id: string;
    let user2Id: string;
    let token: string;

    beforeEach(async () => {
        // Create two test users
        const user1 = await UserModel.create({
            name: 'Test User 1',
            email: 'test1@example.com',
            password: 'password123',
            balance: 100
        });

        const user2 = await UserModel.create({
            name: 'Test User 2',
            email: 'test2@example.com',
            password: 'password123',
            balance: 50
        });

        user1Id = user1._id.toString();
        user2Id = user2._id.toString();

        // Login to get token
        const loginResponse = await request(app)
            .post('/login')
            .send({
                email: 'test1@example.com',
                password: 'password123'
            });

        token = loginResponse.body.token;
    });

    it('should successfully transfer balance between users', async () => {
        const response = await request(app)
            .post('/transfer')
            .set('Authorization', `Bearer ${token}`)
            .send({
                fromUserId: user1Id,
                toUserId: user2Id,
                amount: 50
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Transfer successful');

        // Verify balances were updated
        const [user1, user2] = await Promise.all([
            UserModel.findById(user1Id),
            UserModel.findById(user2Id)
        ]);

        expect(user1?.balance).toBe(50);
        expect(user2?.balance).toBe(100);
    });

    it('should fail when transferring more than available balance', async () => {
        const response = await request(app)
            .post('/transfer')
            .set('Authorization', `Bearer ${token}`)
            .send({
                fromUserId: user1Id,
                toUserId: user2Id,
                amount: 150
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Insufficient balance');

        // Verify balances were not changed
        const [user1, user2] = await Promise.all([
            UserModel.findById(user1Id),
            UserModel.findById(user2Id)
        ]);

        expect(user1?.balance).toBe(100);
        expect(user2?.balance).toBe(50);
    });

    it('should fail when transferring to non-existent user', async () => {
        const nonExistentId = new mongoose.Types.ObjectId().toString();
        
        const response = await request(app)
            .post('/transfer')
            .set('Authorization', `Bearer ${token}`)
            .send({
                fromUserId: user1Id,
                toUserId: nonExistentId,
                amount: 50
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('One or both users not found');

        // Verify balances were not changed
        const [user1, user2] = await Promise.all([
            UserModel.findById(user1Id),
            UserModel.findById(user2Id)
        ]);

        expect(user1?.balance).toBe(100);
        expect(user2?.balance).toBe(50);
    });

    it('should fail when transferring to the same user', async () => {
        const response = await request(app)
            .post('/transfer')
            .set('Authorization', `Bearer ${token}`)
            .send({
                fromUserId: user1Id,
                toUserId: user1Id,
                amount: 50
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Cannot transfer to the same user');

        // Verify balance was not changed
        const user1 = await UserModel.findById(user1Id);
        expect(user1?.balance).toBe(100);
    });
}); 