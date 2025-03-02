"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductos = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../../../lib/db");
exports.getProductos = (0, express_async_handler_1.default)(async (req, res) => {
    const products = await db_1.db.product.findMany();
    res.status(200).json(products);
    return;
});
