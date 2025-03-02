// src/controllers/productos/getProductoById.ts
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { db } from "../../../lib/db";

import { ObjectId } from "bson"; 

export const getProductoById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
     res.status(400).json({ error: "El id proporcionado no es válido" });
     return;
  }

  const product = await db.product.findUnique({
    where: { id },
  });

  if (!product) {
     res.status(404).json({ error: "Producto no encontrado" });
     return;
  }

   res.status(200).json(product);
   return;
});
