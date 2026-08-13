"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHealth = void 0;
const database_1 = require("../config/database");
const checkHealth = async (req, res) => {
    const dbStatus = await (0, database_1.testDatabaseConnection)();
    res.status(200).json({
        success: true,
        message: 'Yoga Studio API is running',
        database: {
            connected: dbStatus.connected,
            name: dbStatus.database
        }
    });
};
exports.checkHealth = checkHealth;
