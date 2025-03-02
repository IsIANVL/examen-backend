"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProducto = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../../../lib/db");
const bson_1 = require("bson");
exports.deleteProducto = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    if (!bson_1.ObjectId.isValid(id)) {
        res.status(400).json({ error: "El id proporcionado no es válido" });
        return;
    }
    try {
        await db_1.db.product.delete({
            where: { id },
        });
        res.status(204).send();
        return;
    }
    catch (error) {
        res.status(404).json({ error: "No se pudo eliminar. Producto no encontrado" });
        return;
    }
});
