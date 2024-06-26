"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
exports.default = {
    port: process.env.PORT,
    db: process.env.DRIZZLE_DATABASE_URL,
    saltWorkFactor: 10,
    accessTokenTtl: "5m",
    refreshTokenTtl: "30d",
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY
};
