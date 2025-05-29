const db = require('./db');

// create a new user in the database
const createUser = (name, hashedPassword) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO user (Name, pwd) VALUES (?, ?)';
        db.query(query, [name, hashedPassword], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// find a user by their name in the database
const findUserByName = (name) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM user WHERE Name = ?';
        db.query(query, [name], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

// get roles from username
const getUserRoles = (username) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT r.role_name FROM users u
            JOIN user_roles ur ON u.id = ur.user_id
            JOIN roles r ON ur.role_id = r.id
            WHERE u.username = ?;
        `;
        db.query(query, [username], (err, results) => {
            if (err) return reject(err);
            resolve(results.map(row => row.role_name));
        });
    });
};

// assign role to user
const assignRoleToUser = (username, roleName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const getUserIdQuery = 'SELECT id FROM users WHERE username = ?';
            const getRoleIdQuery = 'SELECT id FROM roles WHERE role_name = ?';
            const assignRoleQuery = 'INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)';

            const [userResults] = await db.query(getUserIdQuery, [username]);
            const [roleResults] = await db.query(getRoleIdQuery, [roleName]);

            if (userResults.length === 0 || roleResults.length === 0) {
                return reject(new Error('User or Role not found'));
            }

            const userId = userResults[0].id;
            const roleId = roleResults[0].id;

            db.query(assignRoleQuery, [userId, roleId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        } catch (err) {
            reject(err);
        }
    });
};

// create a new role
const createRole = (roleName) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO roles (role_name) VALUES (?)';
        db.query(query, [roleName], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = {
    createUser,
    findUserByName
};
