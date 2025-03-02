"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSingleInstrument = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../../lib/db");
exports.updateSingleInstrument = (0, express_async_handler_1.default)(async (req, res) => {
    const { idOrden, idDatoCert } = req.body;
    if (!idOrden || !idDatoCert) {
        res.status(400).json({ error: "Falta idOrden o idDatoCert en el body" });
        return;
    }
    const bitacoraRecord = await db_1.db.bitacora.findFirst({ where: { IdOrden: idOrden } });
    if (!bitacoraRecord) {
        res.status(404).json({ error: "No se encontró bitácora con ese idOrden" });
        return;
    }
    const ordenServicio = bitacoraRecord.Orden;
    const updatable = {
        Instrumento: req.body.Instrumento,
        Marca: req.body.Marca,
        Modelo: req.body.Modelo,
        Serie: req.body.Serie,
        Identificacion: req.body.Identificacion,
        IntervaloInicio: req.body.IntervaloInicio,
        IntervaloFinal: req.body.IntervaloFinal,
        PuntosEsp: req.body.PuntosEsp,
        Otros: req.body.Otros,
    };
    const dataToUpdate = Object.fromEntries(Object.entries(updatable).filter(([_, v]) => v !== undefined));
    if (!Object.keys(dataToUpdate).length) {
        res.status(400).json({ error: "No hay campos para actualizar" });
        return;
    }
    const result = await db_1.db.datosInstCertificado.updateMany({
        where: {
            OrdenServicio: ordenServicio,
            idDatoCert: idDatoCert,
        },
        data: dataToUpdate,
    });
    if (!result.count) {
        res.status(404).json({ error: "No se encontró instrumento con ese idDatoCert" });
        return;
    }
    res.status(200).json({
        message: "Instrumento actualizado correctamente",
        success: true,
        updatedFields: dataToUpdate,
    });
    return;
});
