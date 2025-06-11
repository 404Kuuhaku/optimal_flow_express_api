import request from 'supertest';
import app from '../app';
import UserModel from '../models/userModel';

describe('Authentication API', () => {
    beforeEach(async () => {
        await UserModel.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            balance: 100
        });
    });

    it('should successfully login with valid credentials', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');
        expect(response.body.user).toHaveProperty('email', 'test@example.com');
        expect(response.body.user).not.toHaveProperty('password');
        expect(response.body).toHaveProperty('token');
    });

    it('should fail login with invalid password', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'test@example.com',
                password: 'wrongpassword'
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid email or password.');
    });

    it('should fail login with non-existent user', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'nonexistent@example.com',
                password: 'password123'
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid email or password.');
    });

    it('should fail login with missing credentials', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'test@example.com'
            });

        expect(response.status).toBe(400);
    });
}); 