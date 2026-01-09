
import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization; 

    if(!authHeader) {
        return res.status(401).json({ error: "Token não enviado" });
    }

    const [, token ] = authHeader.split(" ");

    if (!token) {
        return res.status(401).json({ error: "Token inválido" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
}