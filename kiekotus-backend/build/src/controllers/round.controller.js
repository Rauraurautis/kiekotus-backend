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
exports.postRoundHandler = exports.getAllRoundsHandler = exports.getRoundsHandler = void 0;
const round_model_1 = require("../models/round.model");
const getRoundsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rounds = yield (0, round_model_1.getRounds)(Number(req.params.userId));
        return res.status(200).send(rounds);
    }
    catch (error) {
        next(error);
    }
});
exports.getRoundsHandler = getRoundsHandler;
const getAllRoundsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rounds = yield (0, round_model_1.getRounds)(res.locals.id);
        return res.status(200).send(rounds);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllRoundsHandler = getAllRoundsHandler;
const postRoundHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Objektin muoto vaihtelee, pitää korjata jossain vaiheessa
        const userId = (_a = res.locals.user._id) !== null && _a !== void 0 ? _a : res.locals.user.user._id;
        const round = yield (0, round_model_1.addRound)(req.body, userId);
        console.log(req.body);
        return res.status(200).send(round);
    }
    catch (error) {
        next(error);
    }
});
exports.postRoundHandler = postRoundHandler;
