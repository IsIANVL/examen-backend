"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatosFactura = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../../lib/db");
exports.getDatosFactura = (0, express_async_handler_1.default)(async (req, res) => {
    const { idOrden } = req.body;
    if (!idOrden) {
        res.status(400).json({ error: "idOrden es requerido en el body" });
        return;
    }
    // 1) Buscamos Bitacora para obtener Orden (ej. "AG0003")
    const bitacoraRecord = await db_1.db.bitacora.findFirst({
        where: { IdOrden: idOrden },
    });
    if (!bitacoraRecord) {
        res.status(404).json({ error: "No se encontró bitácora con ese idOrden" });
        return;
    }
    const ordenServicio = bitacoraRecord.Orden; // p.e. "AG0003"
    // 2) Con esa orden, consultamos DatosFactura
    const registro = await db_1.db.datosFactura.findFirst({
        where: { OrdenServicio: ordenServicio },
        select: {
            OrdenServicio: true,
            RFC: true,
            Empresa: true,
            Correo: true,
            Direccion: true,
            Ciudad: true,
            Municipio: true,
            Estado: true,
            CP: true,
            Pedido: true,
            MetodoPago: true,
            FormaPago: true,
            UsoCFDI: true,
        },
    });
    if (!registro) {
        res.status(404).json({ error: "No se encontró DatosFactura con esa Orden" });
        return;
    }
    res.status(200).json(registro);
    return;
});
