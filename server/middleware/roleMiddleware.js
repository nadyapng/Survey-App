const { getUserRoles } = require('../database/helperFunctions');

async function checkRole(roles) {
    return async (req, res, next) => {
        try {
            const username = req.body.username; // Assuming username is available in the request body
            const userRoles = await getUserRoles(username);

            const hasRole = userRoles.some(role => roles.includes(role));
            if (!hasRole) {
                return res.status(403).json({ success: false, message: "Access denied." });
            }

            next();
        } catch (error) {
            console.error('Role check error:', error);
            res.status(500).json({ success: false, message: "Server error during role check." });
        }
    };
}

module.exports = checkRole;
