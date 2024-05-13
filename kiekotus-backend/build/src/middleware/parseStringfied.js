"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseStringified = void 0;
const parseStringified = (req, res, next) => {
    const body = req.body;
    const numerifiedHoles = Object.assign(Object.assign({}, body), { holes: body.holes.map((el) => {
            return { distance: parseInt(el.distance), par: parseInt(el.par) };
        }) });
    console.log(numerifiedHoles);
    req.body = numerifiedHoles;
    return next();
};
exports.parseStringified = parseStringified;
