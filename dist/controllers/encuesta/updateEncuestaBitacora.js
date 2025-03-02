"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEncuestaBitacora = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../../lib/db");
exports.updateEncuestaBitacora = (0, express_async_handler_1.default)(async (req, res) => {
    const { idOrden, califica, comentarios } = req.body;
    if (!idOrden) {
        res.status(400).json({
            error: "Falta idOrden en el body"
        });
        return;
    }
    if (!califica) {
        res.status(400).json({
            error: "Falta califica en el body"
        });
        return;
    }
    // comentarios podría ser opcional, según tu lógica
    // 1) Buscamos la bitácora por IdOrden
    const bitacoraRecord = await db_1.db.bitacora.findFirst({
        where: { IdOrden: idOrden },
    });
    if (!bitacoraRecord) {
        res.status(404).json({ error: "No se encontró bitácora con ese idOrden" });
        return;
    }
    // 2) Actualizamos Califica y Comentarios
    const updated = await db_1.db.bitacora.update({
        where: { IdDatoBitacora: bitacoraRecord.IdDatoBitacora },
        data: {
            Califica: califica,
            Comentarios: comentarios || null, // si es opcional
        },
    });
    // 3) Respondemos éxito
    res.status(200).json({
        message: "Gracias por tu calificación 🤩",
        data: updated,
    });
    return;
});
