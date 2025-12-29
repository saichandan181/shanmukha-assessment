const request = require('supertest');
const app = require('../src/app');

describe('Authentication Endpoints', () => {
    let authToken;
    let testUser = {
        email: `test${Date.now()}@example.com`,
        password: 'Test@123',
        full_name: 'Test User'
    };

    describe('POST /api/auth/signup', () => {
        it('should register a new user successfully', async () => {
            const response = await request(app)
                .post('/api/auth/signup')
                .send(testUser)
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('User registered successfully');
            expect(response.body.data).toHaveProperty('access_token');
            expect(response.body.data.user).toHaveProperty('email', testUser.email);
            expect(response.body.data.user).toHaveProperty('role', 'user');
            
            authToken = response.body.data.access_token;
        });

        it('should fail with invalid email', async () => {
            const response = await request(app)
                .post('/api/auth/signup')
                .send({
                    email: 'invalid-email',
                    password: 'Test@123',
                    full_name: 'Test User'
                })
                .expect(400);

            expect(response.body.success).toBe(false);
        });

        it('should fail with short password', async () => {
            const response = await request(app)
                .post('/api/auth/signup')
                .send({
                    email: 'test@example.com',
                    password: '123',
                    full_name: 'Test User'
                })
                .expect(400);

            expect(response.body.success).toBe(false);
        });

        it('should fail without full name', async () => {
            const response = await request(app)
                .post('/api/auth/signup')
                .send({
                    email: 'test@example.com',
                    password: 'Test@123'
                })
                .expect(400);

            expect(response.body.success).toBe(false);
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login successfully with correct credentials', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: testUser.email,
                    password: testUser.password
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Login successful');
            expect(response.body.data).toHaveProperty('access_token');
        });

        it('should fail with incorrect password', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: testUser.email,
                    password: 'WrongPassword'
                })
                .expect(401);

            expect(response.body.success).toBe(false);
        });

        it('should fail with non-existent email', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'nonexistent@example.com',
                    password: 'Test@123'
                })
                .expect(401);

            expect(response.body.success).toBe(false);
        });
    });

    describe('GET /api/auth/me', () => {
        it('should get current user with valid token', async () => {
            const response = await request(app)
                .get('/api/auth/me')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('email', testUser.email);
            expect(response.body.data).toHaveProperty('role');
        });

        it('should fail without token', async () => {
            const response = await request(app)
                .get('/api/auth/me')
                .expect(401);

            expect(response.body.success).toBe(false);
        });

        it('should fail with invalid token', async () => {
            const response = await request(app)
                .get('/api/auth/me')
                .set('Authorization', 'Bearer invalid-token')
                .expect(401);

            expect(response.body.success).toBe(false);
        });
    });

    describe('POST /api/auth/logout', () => {
        it('should logout successfully', async () => {
            const response = await request(app)
                .post('/api/auth/logout')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Logout successful');
        });
    });
});
