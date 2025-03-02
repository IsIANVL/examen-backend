
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { db } from "../../../lib/db";

export const getProductos = asyncHandler(async (req: Request, res: Response) => {
  const products = await db.product.findMany();
   res.status(200).json(products);
   return;
});
