const bcrypt = require('bcrypt');
const { registerUser, loginUser, ChangeCredentials } = require('../routes/Authentication/authController');
const { createUser, findUserByName } = require('../database/helperFunctions');
const db = require('../database/db');

// Mocking bcrypt and database functions
jest.mock('bcrypt');
jest.mock('../database/helperFunctions');
jest.mock('../database/db');

describe('Auth Controller', () => {

    describe('registerUser', () => {
        it('should register a user successfully', async () => {
            const req = { body: { username: 'testUser', password: 'password123' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            bcrypt.hash.mockResolvedValue('hashedPassword');
            createUser.mockResolvedValue({ insertId: 1 });

            await registerUser(req, res);

            expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
            expect(createUser).toHaveBeenCalledWith('testUser', 'hashedPassword');
            expect(res.json).toHaveBeenCalledWith({ success: true, message: "User registered successfully." });
        });

        it('should handle errors during user registration', async () => {
            const req = { body: { username: 'testUser', password: 'password123' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            bcrypt.hash.mockRejectedValue(new Error('Hashing error'));
            
            await registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: "Error registering user." });
        });
    });

    describe('loginUser', () => {
        it('should authenticate a user successfully', async () => {
            const req = { body: { username: 'testUser', password: 'password123' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            findUserByName.mockResolvedValue({ Name: 'testUser', pwd: 'hashedPassword' });
            bcrypt.compare.mockResolvedValue(true);

            await loginUser(req, res);

            expect(findUserByName).toHaveBeenCalledWith('testUser');
            expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
            expect(res.json).toHaveBeenCalledWith({ success: true, message: "User authenticated successfully.", username: 'testUser' });
        });

        it('should return 401 if user not found', async () => {
            const req = { body: { username: 'nonExistentUser', password: 'password123' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            findUserByName.mockResolvedValue(null);

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: "Authentication failed. User not found." });
        });

        it('should return 401 if password does not match', async () => {
            const req = { body: { username: 'testUser', password: 'wrongPassword' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            findUserByName.mockResolvedValue({ Name: 'testUser', pwd: 'hashedPassword' });
            bcrypt.compare.mockResolvedValue(false);

            await loginUser(req, res);

            expect(bcrypt.compare).toHaveBeenCalledWith('wrongPassword', 'hashedPassword');
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: "Authentication failed. Wrong password." });
        });

        it('should handle errors during login', async () => {
            const req = { body: { username: 'testUser', password: 'password123' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            findUserByName.mockRejectedValue(new Error('Database error'));

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: "Error logging in user." });
        });
    });

    describe('ChangeCredentials', () => {
        it('should change user credentials successfully', async () => {
            const req = { body: { newUsername: 'testUser', newPassword: 'newPassword123' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            bcrypt.hash.mockResolvedValue('newHashedPassword');
            db.execute.mockResolvedValue([{}, {}]); // Simulating query execution result

            await ChangeCredentials(req, res);

            expect(bcrypt.hash).toHaveBeenCalledWith('newPassword123', 10);
            expect(db.execute).toHaveBeenCalledWith(
                'UPDATE user SET pwd = ? WHERE Name = ?',
                ['newHashedPassword', 'testUser']
            );
            expect(res.json).toHaveBeenCalledWith({ success: true, message: "User credentials updated successfully." });
        });

        it('should return 500 if new password is missing', async () => {
            const req = { body: { newUsername: 'testUser', newPassword: '' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            await ChangeCredentials(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: "Error changing user." });
        });

        it('should handle errors during credential change', async () => {
            const req = { body: { newUsername: 'testUser', newPassword: 'newPassword123' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            bcrypt.hash.mockRejectedValue(new Error('Hashing error'));

            await ChangeCredentials(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: "Error changing user." });
        });
    });
});
