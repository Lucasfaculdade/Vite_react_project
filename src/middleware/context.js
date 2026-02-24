
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function(req, res, next) {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if(!authHeader) return res.status(401).json({ message: 'Token não enviado' });

    const parts = authHeader.split(' ');
    if(parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Formato inválido do token'});

    const token = parts[1]
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido ou expirado'});
    }
};