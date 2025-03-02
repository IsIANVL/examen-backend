"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductosFilters = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../../../lib/db");
/**
 * POST /api/productos/search
 * Body JSON (ejemplo):
 * {
 *   "descuento": true,
 *   "priceMin": 100,
 *   "priceMax": 500,
 *   "sortBy": "precio",
 *   "sortOrder": "desc"
 * }
 *
 * Explicación:
 * - descuento: Boolean -> filtra solo productos con o sin descuento
 * - priceMin: Number -> filtra productos con precio >= priceMin
 * - priceMax: Number -> filtra productos con precio <= priceMax
 * - sortBy: "precio" | "createdAt" (u otro campo) -> campo para ordenar
 * - sortOrder: "asc" | "desc" -> orden ascendente/descendente
 */
exports.getProductosFilters = (0, express_async_handler_1.default)(async (req, res) => {
    // Desestructuramos los campos del body
    const { descuento, priceMin, priceMax, sortBy, sortOrder } = req.body;
    // 1) Construimos el objeto 'where' para filtrar
    const where = {};
    // Filtro por descuento (true/false)
    if (typeof descuento === "boolean") {
        where.descuento = descuento;
    }
    // Filtro por rango de precio
    if (priceMin !== undefined || priceMax !== undefined) {
        where.precio = {};
        if (priceMin !== undefined) {
            where.precio.gte = parseFloat(priceMin);
        }
        if (priceMax !== undefined) {
            where.precio.lte = parseFloat(priceMax);
        }
    }
    // 2) Construimos 'orderBy' para ordenar resultados
    const orderBy = [];
    if (sortBy) {
        // Aseguramos valor de sortOrder, por defecto 'asc'
        const order = sortOrder === "desc" ? "desc" : "asc";
        orderBy.push({ [sortBy]: order });
    }
    // 3) Consultamos la base de datos usando Prisma
    const products = await db_1.db.product.findMany({
        where,
        orderBy,
        // Podrías agregar paginación con 'take' y 'skip'
    });
    // 4) Retornamos los resultados
    res.status(200).json(products);
    return;
});
