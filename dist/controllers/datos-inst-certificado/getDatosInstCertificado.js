"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatosInstCertificado = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../../lib/db");
exports.getDatosInstCertificado = (0, express_async_handler_1.default)(async (req, res) => {
    const { idOrden } = req.body;
    if (!idOrden) {
        res.status(400).json({ error: "Falta idOrden en el body" });
        return;
    }
    // Buscar en Bitacora => obtener Orden
    const bitacoraRecord = await db_1.db.bitacora.findFirst({
        where: { IdOrden: idOrden },
    });
    if (!bitacoraRecord) {
        res.status(404).json({ error: "No se encontró bitácora con ese idOrden" });
        return;
    }
    const ordenServicio = bitacoraRecord.Orden;
    // Buscar instrumentos en DatosInstCertificado
    const registros = await db_1.db.datosInstCertificado.findMany({
        where: { OrdenServicio: ordenServicio },
        // Puedes seleccionar campos específicos si deseas
    });
    if (!registros.length) {
        res.status(404).json({ error: "No se encontraron instrumentos con esa Orden" });
        return;
    }
    res.status(200).json({
        message: "Registros encontrados",
        success: true,
        data: registros,
    });
    return;
});
