"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDatosInstCertificado = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../../lib/db");
exports.updateDatosInstCertificado = (0, express_async_handler_1.default)(async (req, res) => {
    const { idOrden, instrumentos } = req.body;
    if (!idOrden || !instrumentos) {
        res.status(400).json({ error: "Faltan campos en el body (idOrden, instrumentos)" });
        return;
    }
    // 1) Buscar Orden
    const bitacoraRecord = await db_1.db.bitacora.findFirst({
        where: { IdOrden: idOrden },
    });
    if (!bitacoraRecord) {
        res.status(404).json({ error: "No se encontró bitácora con ese idOrden" });
        return;
    }
    const ordenServicio = bitacoraRecord.Orden;
    // 2) instruments es un array, iterar y actualizar c/u según su idDatoCert
    // (ejemplo: updateMany con un loop)
    const updates = [];
    for (const inst of instrumentos) {
        if (!inst.idDatoCert)
            continue; // o manejar error
        // Filtramos los campos
        const updatable = {
            Instrumento: inst.Instrumento,
            Marca: inst.Marca,
            Modelo: inst.Modelo,
            Serie: inst.Serie,
            Identificacion: inst.Identificacion,
            IntervaloInicio: inst.IntervaloInicio,
            IntervaloFinal: inst.IntervaloFinal,
            PuntosEsp: inst.PuntosEsp,
            Otros: inst.Otros,
        };
        const dataToUpdate = Object.fromEntries(Object.entries(updatable).filter(([_, v]) => v !== undefined));
        if (!Object.keys(dataToUpdate).length)
            continue;
        // Hacemos un updateMany x cada instrumento
        const upd = db_1.db.datosInstCertificado.updateMany({
            where: {
                OrdenServicio: ordenServicio,
                idDatoCert: inst.idDatoCert,
            },
            data: dataToUpdate,
        });
        updates.push(upd);
    }
    // 3) Ejecutamos las promesas
    await Promise.all(updates);
    res.status(200).json({
        message: "Instrumentos actualizados correctamente",
        success: true,
    });
    return;
});
