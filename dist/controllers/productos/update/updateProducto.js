"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProducto = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../../../lib/db");
const bson_1 = require("bson");
exports.updateProducto = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    if (!bson_1.ObjectId.isValid(id)) {
        res.status(400).json({ error: "El id proporcionado no es válido" });
        return;
    }
    // Desestructuramos los campos que podríamos actualizar
    const { nombre, descripcion, precio, descuento, porcentajeDescuento, imagenUrl, } = req.body;
    // Creamos un objeto "dataToUpdate" solo con los campos definidos
    const dataToUpdate = {};
    if (nombre !== undefined)
        dataToUpdate.nombre = nombre;
    if (descripcion !== undefined)
        dataToUpdate.descripcion = descripcion;
    if (precio !== undefined)
        dataToUpdate.precio = parseFloat(precio);
    if (descuento !== undefined)
        dataToUpdate.descuento = Boolean(descuento);
    if (porcentajeDescuento !== undefined) {
        dataToUpdate.porcentajeDescuento = parseFloat(porcentajeDescuento);
    }
    if (imagenUrl !== undefined)
        dataToUpdate.imagenUrl = imagenUrl;
    try {
        const updatedProduct = await db_1.db.product.update({
            where: { id },
            data: dataToUpdate,
        });
        res.status(200).json(updatedProduct);
        return;
    }
    catch (error) {
        res.status(404).json({ error: "No se pudo actualizar. Producto no encontrado" });
        return;
    }
});
