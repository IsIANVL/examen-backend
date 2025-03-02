"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDatosFactura = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../../lib/db");
exports.updateDatosFactura = (0, express_async_handler_1.default)(async (req, res) => {
    const { idOrden } = req.body;
    if (!idOrden) {
        res.status(400).json({ error: "Falta idOrden en el body" });
        return;
    }
    // 1) Buscamos Bitacora => obtener Orden
    const bitacoraRecord = await db_1.db.bitacora.findFirst({
        where: { IdOrden: idOrden },
    });
    if (!bitacoraRecord) {
        res.status(404).json({ error: "No se encontró bitácora con ese idOrden" });
        return;
    }
    const ordenServicio = bitacoraRecord.Orden;
    // Campos que pueden actualizarse
    const updatable = {
        RFC: req.body.RFC,
        Empresa: req.body.Empresa,
        Correo: req.body.Correo,
        Direccion: req.body.Direccion,
        Ciudad: req.body.Ciudad,
        Municipio: req.body.Municipio,
        Estado: req.body.Estado,
        CP: req.body.CP,
        Pedido: req.body.Pedido,
        MetodoPago: req.body.MetodoPago,
        FormaPago: req.body.FormaPago,
        UsoCFDI: req.body.UsoCFDI,
    };
    // Filtramos undefined
    const dataToUpdate = Object.fromEntries(Object.entries(updatable).filter(([_, v]) => v !== undefined));
    if (!Object.keys(dataToUpdate).length) {
        res.status(400).json({ error: "No hay campos para actualizar" });
        return;
    }
    // 2) updateMany => actualizamos la fila en base a OrdenServicio
    const result = await db_1.db.datosFactura.updateMany({
        where: { OrdenServicio: ordenServicio },
        data: dataToUpdate,
    });
    if (!result.count) {
        res.status(404).json({ error: "No se encontró registro de factura con esa Orden" });
        return;
    }
    res.status(200).json({
        message: "La información de la factura ha sido actualizada éxitosamente.",
        success: true,
        updatedFields: dataToUpdate,
    });
});
