"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbJo30 = void 0;
// lib/dbJo30.ts
const client_jo30_1 = require("../../prisma_client/client-jo30");
exports.dbJo30 = globalThis.prismaJo30 || new client_jo30_1.PrismaClient();
if (process.env.NODE_ENV !== "production") {
    globalThis.prismaJo30 = exports.dbJo30;
}
