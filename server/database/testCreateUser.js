// testCreateUser.js
const { createUser,findUserByName } = require('./helperFunctions'); 
const bcrypt = require('bcrypt');

async function testCreateAndFindUser() {
    try {
        // sample data for inputting, this is currently stored also in the mysql server
        const username = 'testuser';
        const plainPassword = 'testpassword';

        // for hashing
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        // calls the createUser inside of the helper function, used for register
        const createResult = await createUser(username, hashedPassword);
        console.log('User created successfully:', createResult);

        // finds the user, used for login
        const foundUser = await findUserByName(username);
        console.log('User found:', foundUser);

    } catch (error) {
        console.error('Error during testing:', error);
    }
}

testCreateAndFindUser();