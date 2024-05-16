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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNewPlayedCourseHandler = exports.getUserStatisticsHandler = void 0;
const logger_1 = __importDefault(require("../lib/utils/logger"));
const statistics_model_1 = require("../models/statistics.model");
const getUserStatisticsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stats = yield (0, statistics_model_1.getUserStatistics)(res.locals.user.id);
        return res.status(200).send(stats);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.getUserStatisticsHandler = getUserStatisticsHandler;
const postNewPlayedCourseHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stats = yield (0, statistics_model_1.addNewPlayedCourse)(res.locals.user.id, req.body);
        return res.status(200).send(stats);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.postNewPlayedCourseHandler = postNewPlayedCourseHandler;
/* export const deletePlayedCourseHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = await deletePlayedCourse(res.locals.user.id, req.body)
        return res.status(200).send(stats)
    } catch (error) {
        logger.error(error)
        next(error)
    }
} */ 
