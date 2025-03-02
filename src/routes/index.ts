import { Router } from "express";
import { createProducto } from "../controllers/productos/create/createProducto";


const router = Router();


/** RUTA NUEVA: crear producto **/
router.post("/productos", createProducto);


export default router;
