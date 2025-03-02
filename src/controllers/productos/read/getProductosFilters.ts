import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { db } from "../../../lib/db";

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
export const getProductosFilters = asyncHandler(
  async (req: Request, res: Response) => {
    // Desestructuramos los campos del body
    const { descuento, priceMin, priceMax, sortBy, sortOrder } = req.body;

    // 1) Construimos el objeto 'where' para filtrar
    const where: any = {};

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
    const orderBy: any[] = [];

    if (sortBy) {
      // Aseguramos valor de sortOrder, por defecto 'asc'
      const order = sortOrder === "desc" ? "desc" : "asc";
      orderBy.push({ [sortBy]: order });
    }

    // 3) Consultamos la base de datos usando Prisma
    const products = await db.product.findMany({
      where,
      orderBy,
      // Podrías agregar paginación con 'take' y 'skip'
    });

    // 4) Retornamos los resultados
    res.status(200).json(products);
    return;
  }
);
