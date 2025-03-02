"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/** CREATE */
const createProducto_1 = require("../controllers/productos/create/createProducto");
/** READ */
const getProductos_1 = require("../controllers/productos/read/getProductos");
const getProductoById_1 = require("../controllers/productos/read/getProductoById");
/** UPDATE */
const updateProducto_1 = require("../controllers/productos/update/updateProducto");
/** DELETE */
const deleteProducto_1 = require("../controllers/productos/delete/deleteProducto");
const getProductosFilters_1 = require("../controllers/productos/read/getProductosFilters");
const router = (0, express_1.Router)();
// Crear producto
// POST /api/productos
router.post("/productos", createProducto_1.createProducto);
// Leer todos los productos (GET simple)
router.get("/productos", getProductos_1.getProductos);
// Leer productos con filtros
router.post("/productos/filters", getProductosFilters_1.getProductosFilters);
// Leer un producto por ID
// GET /api/productos/:id
router.get("/productos/:id", getProductoById_1.getProductoById);
// Actualizar un producto
// PUT /api/productos/:id
router.put("/productos/:id", updateProducto_1.updateProducto);
// Eliminar un producto
// DELETE /api/productos/:id
router.delete("/productos/:id", deleteProducto_1.deleteProducto);
exports.default = router;
