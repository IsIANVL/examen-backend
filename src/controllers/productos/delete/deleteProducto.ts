// src/controllers/productos/deleteProducto.ts
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { db } from "../../../lib/db";
import { ObjectId } from "bson";

export const deleteProducto = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
     res.status(400).json({ error: "El id proporcionado no es válido" });
     return;
  }

  try {
    await db.product.delete({
      where: { id },
    });
     res.status(204).send(); 
     return;
  } catch (error) {
     res.status(404).json({ error: "No se pudo eliminar. Producto no encontrado" });
     return;
  }
});
