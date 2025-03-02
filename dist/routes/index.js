"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createProducto_1 = require("../controllers/productos/create/createProducto");
const router = (0, express_1.Router)();
/** RUTA NUEVA: crear producto **/
router.post("/productos", createProducto_1.createProducto);
exports.default = router;
