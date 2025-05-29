// dbUtils.js

const db = require('./database'); // Import the database connection

/**
 * Executes a SQL query with given parameters and returns the result.
 * @param {string} query - The SQL query to execute.
 * @param {Array} params - The parameters for the query (if any).
 * @returns {Promise} - A promise that resolves with the query result.
 */
async function executeQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) {
                return reject(err); // Reject the promise if an error occurs
            }
            resolve(results); // Resolve the promise with the results
        });
    });
}

/**
 * Fetches all rows from a table.
 * @param {string} tableName - The name of the table to fetch data from.
 * @returns {Promise} - A promise that resolves with the table data.
 */
async function getAll(tableName) {
    const query = `SELECT * FROM ??`;
    return await executeQuery(query, [tableName]);
}

/**
 * Fetches a row by ID from a table.
 * @param {string} tableName - The name of the table.
 * @param {string} idColumn - The name of the ID column.
 * @param {any} idValue - The value of the ID to fetch.
 * @returns {Promise} - A promise that resolves with the row data.
 */
async function getById(tableName, idColumn, idValue) {
    const query = `SELECT * FROM ?? WHERE ?? = ?`;
    return await executeQuery(query, [tableName, idColumn, idValue]);
}

/**
 * Inserts a new row into a table.
 * @param {string} tableName - The name of the table.
 * @param {Object} data - The data to insert (as an object where keys are column names).
 * @returns {Promise} - A promise that resolves with the insert result.
 */
async function insertRow(tableName, data) {
    const query = `INSERT INTO ?? SET ?`;
    return await executeQuery(query, [tableName, data]);
}

/**
 * Updates a row in a table.
 * @param {string} tableName - The name of the table.
 * @param {Object} data - The data to update (as an object where keys are column names).
 * @param {string} idColumn - The name of the ID column.
 * @param {any} idValue - The value of the ID to update.
 * @returns {Promise} - A promise that resolves with the update result.
 */
async function updateRow(tableName, data, idColumn, idValue) {
    const query = `UPDATE ?? SET ? WHERE ?? = ?`;
    return await executeQuery(query, [tableName, data, idColumn, idValue]);
}

/**
 * Deletes a row from a table.
 * @param {string} tableName - The name of the table.
 * @param {string} idColumn - The name of the ID column.
 * @param {any} idValue - The value of the ID to delete.
 * @returns {Promise} - A promise that resolves with the delete result.
 */
async function deleteRow(tableName, idColumn, idValue) {
    const query = `DELETE FROM ?? WHERE ?? = ?`;
    return await executeQuery(query, [tableName, idColumn, idValue]);
}

module.exports = {
    executeQuery,
    getAll,
    getById,
    insertRow,
    updateRow,
    deleteRow
};
