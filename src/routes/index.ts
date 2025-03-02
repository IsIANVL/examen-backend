import { Router } from "express";

/** CREATE */
import { createProducto } from "../controllers/productos/create/createProducto";

/** READ */
import { getProductos } from "../controllers/productos/read/getProductos";
import { getProductoById } from "../controllers/productos/read/getProductoById";


/** UPDATE */
import { updateProducto } from "../controllers/productos/update/updateProducto";

/** DELETE */
import { deleteProducto } from "../controllers/productos/delete/deleteProducto";
import { getProductosFilters } from "../controllers/productos/read/getProductosFilters";


const router = Router();

// Crear producto
// POST /api/productos
router.post("/productos", createProducto);

// Leer todos los productos (GET simple)
router.get("/productos", getProductos);

// Leer productos con filtros
router.post("/productos/filters", getProductosFilters);

// Leer un producto por ID
// GET /api/productos/:id
router.get("/productos/:id", getProductoById);

// Actualizar un producto
// PUT /api/productos/:id
router.put("/productos/:id", updateProducto);

// Eliminar un producto
// DELETE /api/productos/:id
router.delete("/productos/:id", deleteProducto);

export default router;
