// src/controllers/productos/updateProducto.ts
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { db } from "../../../lib/db";
import { ObjectId } from "bson";

export const updateProducto = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
     res.status(400).json({ error: "El id proporcionado no es válido" });
     return;
  }

  // Desestructuramos los campos que podríamos actualiza
  const {
    nombre,
    descripcion,
    precio,
    descuento,
    porcentajeDescuento,
    imagenUrl,
  } = req.body;

  // Creamos un objeto "dataToUpdate" solo con los campos definido
  const dataToUpdate: Record<string, any> = {};

  if (nombre !== undefined) dataToUpdate.nombre = nombre;
  if (descripcion !== undefined) dataToUpdate.descripcion = descripcion;
  if (precio !== undefined) dataToUpdate.precio = parseFloat(precio);
  if (descuento !== undefined) dataToUpdate.descuento = Boolean(descuento);
  if (porcentajeDescuento !== undefined) {
    dataToUpdate.porcentajeDescuento = parseFloat(porcentajeDescuento);
  }
  if (imagenUrl !== undefined) dataToUpdate.imagenUrl = imagenUrl;

  try {
    const updatedProduct = await db.product.update({
      where: { id },
      data: dataToUpdate,
    });
     res.status(200).json(updatedProduct);
     return;
  } catch (error) {
     res.status(404).json({ error: "No se pudo actualizar. Producto no encontrado" });
     return;
  }
});
