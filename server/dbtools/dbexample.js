const db = require('./dbtools/dbUtils');//database tools
app.get('/users', async (req, res) => {
    try {
        const users = await db.executeQuery('select * from user');
        res.json(users);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
/*All of tables[{"Tables_in_surveydb":"option"},
{"Tables_in_surveydb":"question"},
{"Tables_in_surveydb":"survey"},
{"Tables_in_surveydb":"user"},
{"Tables_in_surveydb":"user_survey"}]

 */