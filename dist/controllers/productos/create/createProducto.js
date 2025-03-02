"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProducto = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../../../lib/db");
exports.createProducto = (0, express_async_handler_1.default)(async (req, res) => {
    const { nombre, descripcion, precio, descuento, porcentajeDescuento, imagenUrl, } = req.body;
    if (!nombre || !descripcion || precio === undefined || !imagenUrl) {
        res.status(400).json({
            error: "Faltan campos obligatorios: nombre, descripcion, precio, imagenUrl",
        });
        return;
    }
    const nuevoProducto = await db_1.db.product.create({
        data: {
            nombre,
            descripcion,
            precio: parseFloat(precio),
            descuento: Boolean(descuento),
            porcentajeDescuento: porcentajeDescuento ? parseFloat(porcentajeDescuento) : 0,
            imagenUrl,
        },
    });
    res.status(201).json(nuevoProducto);
    return;
});
