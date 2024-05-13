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
exports.postHoleHandler = exports.deleteCourseHandler = exports.postCourseHandler = exports.getAllCoursesHandler = exports.getSingleCourseHandler = void 0;
const logger_1 = __importDefault(require("../lib/utils/logger"));
const course_model_1 = require("../models/course.model");
const getSingleCourseHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const course = yield (0, course_model_1.getSingleCourse)(id);
        return res.status(200).send(course);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.getSingleCourseHandler = getSingleCourseHandler;
const getAllCoursesHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield (0, course_model_1.getAllCourses)();
        return res.status(200).send(courses);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.getAllCoursesHandler = getAllCoursesHandler;
const postCourseHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCourse = yield (0, course_model_1.addCourse)(req.body);
        return res.status(200).send(newCourse);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.postCourseHandler = postCourseHandler;
const deleteCourseHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCourse = yield (0, course_model_1.deleteCourse)(req.params.id);
        return res.status(200).send(deletedCourse);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.deleteCourseHandler = deleteCourseHandler;
const postHoleHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newHole = yield (0, course_model_1.addHole)(req.body, Number(req.params.id));
        return res.status(200).send(newHole);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.postHoleHandler = postHoleHandler;
