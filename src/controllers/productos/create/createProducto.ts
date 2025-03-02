// src/controllers/productos/createProducto.ts
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { db } from "../../../lib/db";

export const createProducto = asyncHandler(async (req: Request, res: Response) => {
  const {
    nombre,
    descripcion,
    precio,
    descuento,
    porcentajeDescuento,
    imagenUrl,
  } = req.body;

  if (!nombre || !descripcion || precio === undefined || !imagenUrl) {
     res.status(400).json({
      error: "Faltan campos obligatorios: nombre, descripcion, precio, imagenUrl",
    });
    return;
  }

  const nuevoProducto = await db.product.create({
    data: {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      descuento: Boolean(descuento),
      porcentajeDescuento: porcentajeDescuento ? parseFloat(porcentajeDescuento) : 0,
      imagenUrl,
    },
  });

   res.status(201).json(nuevoProducto);
   return;
});
