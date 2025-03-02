"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatosCertificadoCompleto = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../../lib/db");
exports.getDatosCertificadoCompleto = (0, express_async_handler_1.default)(async (req, res) => {
    const { idOrden } = req.body;
    if (!idOrden) {
        res
            .status(400)
            .json({ error: "idOrden es requerido en el body" });
        return;
    }
    // 1) Buscamos en la tabla bitacora para obtener la OrdenServicio real (ej. "AG1986")
    const bitacoraRecord = await db_1.db.bitacora.findFirst({
        where: { IdOrden: idOrden },
    });
    if (!bitacoraRecord) {
        res
            .status(404)
            .json({ error: "No se encontró bitácora con ese idOrden" });
        return;
    }
    const ordenServicio = bitacoraRecord.Orden;
    // 2) Usamos ordenServicio para buscar en la tabla datosFactura
    const registroFactura = await db_1.db.datosFactura.findFirst({
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
    if (!registroFactura) {
        res
            .status(404)
            .json({ error: "No se encontró DatosFactura con esa Orden" });
        return;
    }
    // 3) También buscamos los instrumentos en datosInstCertificado
    const registrosInstrumentos = await db_1.db.datosInstCertificado.findMany({
        where: { OrdenServicio: ordenServicio },
        // select: { ... } si quieres filtrar campos específicos
    });
    // Si quieres marcar error si no existen instrumentos, descomenta:
    // if (!registrosInstrumentos.length) {
    //   return res.status(404).json({
    //     error: "No se encontraron instrumentos con esa Orden"
    //   });
    // }
    // 4) Combinamos factura e instrumentos en un solo objeto
    const respuesta = {
        ...registroFactura,
        instrumentos: registrosInstrumentos,
    };
    // 5) Devolvemos todo en la respuesta
    res.status(200).json(respuesta);
    return;
});
