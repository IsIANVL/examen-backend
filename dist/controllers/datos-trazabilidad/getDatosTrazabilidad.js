"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatosTrazabilidad = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const dbJo30_1 = require("../../lib/dbJo30");
// Ajusta la ruta según tu estructura de proyecto
exports.getDatosTrazabilidad = (0, express_async_handler_1.default)(async (req, res) => {
    // Extraer parámetros de la petición
    const { page = 1, pageSize = 10, identificacion } = req.body;
    // Convertirlos a número
    const pageNumber = parseInt(String(page), 10);
    const pageSizeNumber = parseInt(String(pageSize), 10);
    // Calcular el offset
    const skip = (pageNumber - 1) * pageSizeNumber;
    // 1) Contar registros
    // Si "identificacion" viene, filtramos; si no, no hay filtro
    const whereClause = identificacion
        ? { Identificacion: { equals: identificacion } }
        : {};
    const total = await dbJo30_1.dbJo30.jsmwhTabulizerCartatrazabilidad.count({
        where: whereClause,
    });
    // 2) Obtener filas
    const rows = await dbJo30_1.dbJo30.jsmwhTabulizerCartatrazabilidad.findMany({
        where: whereClause,
        orderBy: {
            id: "desc", // Orden ascendente por el campo "id"
        },
        skip, // offset
        take: pageSizeNumber, // limit
    });
    // 3) Respuesta
    if (total === 0) {
        res.status(200).json({
            message: "No hay registros",
            data: [],
            total: 0,
            page: pageNumber,
            pageSize: pageSizeNumber,
            totalPages: 0,
        });
        return;
    }
    const totalPages = Math.ceil(total / pageSizeNumber);
    res.status(200).json({
        data: rows,
        total,
        page: pageNumber,
        pageSize: pageSizeNumber,
        totalPages,
    });
    return;
});
