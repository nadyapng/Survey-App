const db = require('../database/db');
const { createUser, findUserByName } = require('../database/helperFunctions'); // Adjust the path as needed

// Mock the db.query function
jest.mock('../database/db', () => ({
    query: jest.fn(),
}));

describe('createUser', () => {
    it('should insert a new user into the database and resolve with results', async () => {
        // Arrange
        const mockResults = { affectedRows: 1 };
        db.query.mockImplementation((query, params, callback) => {
            callback(null, mockResults);
        });

        // Act
        const result = await createUser('testUser', 'hashedPassword123');

        // Assert
        expect(db.query).toHaveBeenCalledWith(
            'INSERT INTO user (Name, pwd) VALUES (?, ?)', 
            ['testUser', 'hashedPassword123'], 
            expect.any(Function)
        );
        expect(result).toEqual(mockResults);
    });

    it('should reject with an error if the database query fails', async () => {
        // Arrange
        const mockError = new Error('Database error');
        db.query.mockImplementation((query, params, callback) => {
            callback(mockError);
        });

        // Act & Assert
        await expect(createUser('testUser', 'hashedPassword123')).rejects.toThrow('Database error');
    });
});

describe('findUserByName', () => {
    it('should find a user by name and resolve with the user data', async () => {
        // Arrange
        const mockUser = { id: 1, Name: 'testUser', pwd: 'hashedPassword123' };
        db.query.mockImplementation((query, params, callback) => {
            callback(null, [mockUser]);
        });

        // Act
        const user = await findUserByName('testUser');

        // Assert
        expect(db.query).toHaveBeenCalledWith(
            'SELECT * FROM user WHERE Name = ?', 
            ['testUser'], 
            expect.any(Function)
        );
        expect(user).toEqual(mockUser);
    });

    it('should reject with an error if the database query fails', async () => {
        // Arrange
        const mockError = new Error('Database error');
        db.query.mockImplementation((query, params, callback) => {
            callback(mockError);
        });

        // Act & Assert
        await expect(findUserByName('testUser')).rejects.toThrow('Database error');
    });

    it('should resolve with undefined if no user is found', async () => {
        // Arrange
        db.query.mockImplementation((query, params, callback) => {
            callback(null, []);
        });

        // Act
        const user = await findUserByName('nonExistentUser');

        // Assert
        expect(db.query).toHaveBeenCalledWith(
            'SELECT * FROM user WHERE Name = ?', 
            ['nonExistentUser'], 
            expect.any(Function)
        );
        expect(user).toBeUndefined();
    });
});
