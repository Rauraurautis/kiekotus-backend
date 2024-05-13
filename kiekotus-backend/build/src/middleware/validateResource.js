"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.validateBody = void 0;
const validateBody = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateBody = validateBody;
const validateParams = (schema) => (req, res, next) => {
    try {
        schema.parse(req.params);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateParams = validateParams;
