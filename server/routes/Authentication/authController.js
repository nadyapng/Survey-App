const bcrypt = require('bcrypt');
const { createUser, findUserByName } = require('../../database/helperFunctions');
const saltRounds = 10;
const db = require('../../database/db');
//This is the file that handles the actual authentication such as verifying, hashinig, and interacting with database


// registering a new user
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        console.log('Received registration request:', username);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await createUser(username, hashedPassword);
        console.log('User created in database:', result);

        // Assign default role 'user' to new user
        // await assignRoleToUser(username, 'user');

        res.json({ success: true, message: "User registered successfully." });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, message: "Error registering user." });
    }
};

// logging in an existing user
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    console.log("attempting to login...")
    try {
        const user = await findUserByName(username);
        if (!user) {
            return res.status(401).json({ success: false, message: "Authentication failed. User not found." });
        }

        const passwordMatch = await bcrypt.compare(password, user.pwd);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Authentication failed. Wrong password." });
        }

        res.json({ success: true, message: "User authenticated successfully.", username: username });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, message: "Error logging in user." });
    }
};
const ChangeCredentials = async (req, res) => {
    const { newUsername, newPassword } = req.body;

    console.log('Received change credential request:', newUsername);

    try {
        if (!newPassword) {
            throw new Error('Password is required');
        }

        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        console.log('Password hashed successfully, updating database...');
        const updateUserQuery = `UPDATE user SET pwd = ? WHERE Name = ?`;

        // Execute the update query and log the result without using affectedRows
        const result = await db.execute(updateUserQuery, [hashedPassword, newUsername]);

        // Log the result to see what is returned from the query execution
        console.log('Update result:', result);

        // Send a success response assuming the query execution went fine
        res.json({ success: true, message: "User credentials updated successfully." });

    } catch (error) {
        console.error('Error changing user:', error);
        res.status(500).json({ success: false, message: "Error changing user." });
    }
};




module.exports = {
    registerUser,
    loginUser,
    ChangeCredentials
};
