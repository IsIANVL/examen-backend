"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBitacora = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../lib/db");
exports.getAllBitacora = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const registros = await db_1.db.bitacora.findMany();
        res.status(200).json(registros);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
