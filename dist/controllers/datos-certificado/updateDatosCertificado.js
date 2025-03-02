"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCertificadoCompleto = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../../lib/db");
exports.updateCertificadoCompleto = (0, express_async_handler_1.default)(async (req, res) => {
    const { idOrden, factura, instrumentos } = req.body;
    if (!idOrden) {
        res.status(400).json({ error: "Falta idOrden en el body" });
        return;
    }
    if (!factura) {
        res.status(400).json({ error: "Faltan datos de factura" });
        return;
    }
    // instrumentos puede ser opcional si no hay cambios en instrumentos,
    // pero asumimos que lo mandas aunque esté vacío
    // 1) Buscar en bitácora => obtener Orden real (p.ej. "AG1986")
    const bitacoraRecord = await db_1.db.bitacora.findFirst({
        where: { IdOrden: idOrden },
    });
    if (!bitacoraRecord) {
        res
            .status(404)
            .json({ error: "No se encontró bitácora con ese idOrden" });
        return;
    }
    const ordenServicio = bitacoraRecord.Orden; // p.e. "AG1986"
    // 2) Actualizar datosFactura usando OrdenServicio
    //    (asume que ya existe un registro en datosFactura con ese OrdenServicio)
    const updatedFactura = await db_1.db.datosFactura.updateMany({
        where: { OrdenServicio: ordenServicio },
        data: {
            RFC: factura.RFC,
            Empresa: factura.Empresa,
            Correo: factura.Correo,
            Direccion: factura.Direccion,
            Ciudad: factura.Ciudad,
            Municipio: factura.Municipio,
            Estado: factura.Estado,
            CP: factura.CP,
            Pedido: factura.Pedido,
            MetodoPago: factura.MetodoPago,
            FormaPago: factura.FormaPago,
            UsoCFDI: factura.UsoCFDI,
        },
    });
    // 3) Actualizar instrumentos
    //    Recibimos un array de objetos, cada uno con su "idDatoCert" u otro ID.
    //    Iteramos y actualizamos uno por uno.
    if (Array.isArray(instrumentos)) {
        for (const inst of instrumentos) {
            if (!inst.idDatoCert) {
                // Si no tiene idDatoCert, no podemos actualizar
                continue;
            }
            await db_1.db.datosInstCertificado.updateMany({
                where: { idDatoCert: inst.idDatoCert },
                data: {
                    Instrumento: inst.Instrumento,
                    Marca: inst.Marca,
                    Modelo: inst.Modelo,
                    Serie: inst.Serie,
                    Identificacion: inst.Identificacion,
                    IntervaloInicio: inst.IntervaloInicio,
                    IntervaloFinal: inst.IntervaloFinal,
                    Unidad: inst.Unidad,
                    PuntosEsp: inst.PuntosEsp,
                    // Agrega los campos que sean necesarios
                },
            });
        }
    }
    res.status(200).json({
        message: "Certificado (factura + instrumentos) actualizado con éxito",
        updatedFactura,
    });
    return;
});
