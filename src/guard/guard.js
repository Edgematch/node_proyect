const admin = require('../services/firebase');

const firebaseGuard = async (req, res, next)=>{
    if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')){
        return res.status(403).json({valid: false, message: 'Unauthorized'})
    }

    let authToken = req.headers.authorization.split('Bearer ')[1];

    try {
        const decodedAuthToken = await admin.auth().verifyIdToken(authToken)
        req.user = decodedAuthToken;
        next();
    } catch (err) {
        return res.status(403).json({valid: false, message: err.message})
    }   

}

module.exports = firebaseGuard;