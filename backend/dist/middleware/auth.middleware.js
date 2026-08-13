"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../config/database"));
const requireAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Authentication required' });
        }
        const secret = process.env.AUTH_SECRET || 'fallback_secret_for_dev';
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (!decoded || !decoded.id) {
            return res.status(401).json({ success: false, message: 'Invalid authentication token' });
        }
        // Verify user still exists in DB
        const connection = await database_1.default.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [decoded.id]);
            const users = rows;
            if (users.length === 0) {
                return res.status(401).json({ success: false, message: 'User not found' });
            }
            req.user = users[0];
            next();
        }
        finally {
            connection.release();
        }
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};
exports.requireAuth = requireAuth;
const requireAdmin = (req, res, next) => {
    (0, exports.requireAuth)(req, res, () => {
        if (req.user && req.user.role === 'ADMIN') {
            next();
        }
        else {
            res.status(403).json({ success: false, message: 'Access denied. Admin role required.' });
        }
    });
};
exports.requireAdmin = requireAdmin;
