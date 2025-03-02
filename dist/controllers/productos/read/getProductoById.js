"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductoById = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../../../lib/db");
const bson_1 = require("bson");
exports.getProductoById = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    if (!bson_1.ObjectId.isValid(id)) {
        res.status(400).json({ error: "El id proporcionado no es válido" });
        return;
    }
    const product = await db_1.db.product.findUnique({
        where: { id },
    });
    if (!product) {
        res.status(404).json({ error: "Producto no encontrado" });
        return;
    }
    res.status(200).json(product);
    return;
});
