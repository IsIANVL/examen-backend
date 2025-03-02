"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatosFactura = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../lib/db");
exports.getDatosFactura = (0, express_async_handler_1.default)(async (req, res) => {
    const { NoOrden } = req.body;
    if (!NoOrden) {
        res.status(400).json({ error: "NoOrden es requerido en el body" });
        return;
    }
    const registro = await db_1.db.datosFactura.findFirst({
        where: {
            OrdenServicio: NoOrden,
        },
        select: {
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
        res.status(404).json({ error: "No se encontró registro con ese OrdenServicio" });
        return;
    }
    res.status(200).json(registro);
});
