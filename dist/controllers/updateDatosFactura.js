"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDatosFactura = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../lib/db");
exports.updateDatosFactura = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const { NoOrden } = req.body;
        if (!NoOrden) {
            res.status(400).json({ error: "Falta NoOrden en el body" });
            return;
        }
        // Construimos un objeto con los campos que podrían actualizarse
        const updatable = {
            RFC: req.body.RFC,
            Empresa: req.body.Empresa,
            Correo: req.body.Correo,
            "Dirección": req.body.Direccion,
            Ciudad: req.body.Ciudad,
            Municipio: req.body.Municipio,
            Estado: req.body.Estado,
            CP: req.body.CP,
            Pedido: req.body.Pedido,
            MetodoPago: req.body.MetodoPago,
            FormaPago: req.body.FormaPago,
            UsoCFDI: req.body.UsoCFDI,
        };
        // Filtramos solamente los campos que NO sean undefined
        const dataToUpdate = Object.fromEntries(Object.entries(updatable).filter(([_, val]) => val !== undefined));
        if (!Object.keys(dataToUpdate).length) {
            res.status(400).json({ error: "No hay campos para actualizar" });
            return;
        }
        const result = await db_1.db.datosFactura.updateMany({
            where: { OrdenServicio: NoOrden },
            data: dataToUpdate,
        });
        if (!result.count) {
            res.status(404).json({ error: "No se encontró registro con esa OrdenServicio" });
            return;
        }
        res.status(200).json({ message: "La información ha sido actualizada éxitosamente.", success: true, updatedFields: dataToUpdate });
    }
    catch (error) {
        next(error);
    }
});
