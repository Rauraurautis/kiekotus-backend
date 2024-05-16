"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = void 0;
const drizzle_1 = require("../lib/drizzle");
const schema_1 = require("../lib/drizzle/schema");
const createSession = (input, userAgent) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield drizzle_1.db.insert(schema_1.sessions).values({ userAgent: userAgent, userId: input.id }).returning();
    return session[0];
});
exports.createSession = createSession;
