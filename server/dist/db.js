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
exports.createUser = exports.validUser = void 0;
const _1 = require(".");
const validUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userFromDB = yield (yield (0, _1.DB)())
        .collection("users")
        .findOne({ steam_id: user.id });
    return userFromDB;
});
exports.validUser = validUser;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdObj = yield (yield (0, _1.DB)()).collection("users").insertOne({
        steam_id: user.id,
        name: user.displayName,
        image: user.photos ? user.photos[2].value : "",
        balance: 0,
    });
    const userFromDB = {
        _id: userIdObj.insertedId,
        steam_id: user.id,
        name: user.displayName,
        image: user.photos ? user.photos[2].value : "",
        balance: 0,
    };
    return userFromDB;
});
exports.createUser = createUser;
