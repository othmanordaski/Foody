const {verifyToken} = require('../Helpers/JWT'); // Assuming verifyToken function is imported correctly

exports.isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.tokenAuth || null;
        //console.log(token)
        if (!token) {
            return res.status(401).json({ message: 'Empty token. Please login to access this resource.' });
        }

        const verify = verifyToken(token);

        if (!verify) {
            return res.status(401).json({ message: 'Session not found. Please login again.' });
        }
        req.user= verify;
        console.log(req.user)
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}