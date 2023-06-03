"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.DB = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_steam_1 = require("passport-steam");
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoDB = __importStar(require("mongodb"));
const db_1 = require("./db");
dotenv_1.default.config();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL || "";
const JWT_SECRET = process.env.JWT_SECRET || "";
const client = new mongoDB.MongoClient(MONGODB_URL);
const secretKey = crypto_1.default.randomBytes(32).toString("hex");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const DB = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield client.db("skin_games");
    return db;
});
exports.DB = DB;
app.use((0, express_session_1.default)({
    secret: secretKey,
    resave: true,
    saveUninitialized: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use(new passport_steam_1.Strategy({
    returnURL: "http://localhost:10000/auth/steam/return",
    realm: "http://localhost:10000/",
    apiKey: "3F0476DB842874F0D9F1481092C5C1C4",
}, (identifier, profile, done) => {
    done(null, profile);
}));
passport_1.default.serializeUser((user, done) => done(null, user));
passport_1.default.deserializeUser((user, done) => done(null, user));
app.get("/auth/steam", passport_1.default.authenticate("steam"));
app.get("/auth/steam/return", passport_1.default.authenticate("steam", { failureRedirect: "/auth/steam" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const userSteam = req.user;
        let userFromDB = yield (0, db_1.validUser)(userSteam);
        if (userFromDB == null) {
            userFromDB = yield (0, db_1.createUser)(userSteam);
        }
        const token = jsonwebtoken_1.default.sign(Object.assign({}, userFromDB), JWT_SECRET, {
            expiresIn: "6h",
        });
        res.redirect(`http://localhost:3000/?jwt=${token}}`);
    }
}));
app.get("/categories", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (yield (0, exports.DB)())
        .collection("games-categories")
        .find({})
        .toArray();
    res.json(categories);
}));
app.get("/game/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const gameById = yield (yield (0, exports.DB)())
            .collection("games")
            .findOne({ _id: new mongoDB.ObjectId(id) });
        res.status(200).json({ status: "Success", data: gameById });
    }
    catch (e) {
        res
            .status(400)
            .json({ status: "Failed", message: "Error, try again later" });
    }
}));
const validPage = (page, total) => {
    const pageNum = Number(page);
    if (!pageNum || pageNum == 0 || pageNum < 0)
        return 1;
    if (pageNum > total)
        return total;
};
app.get("/store", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const filter = {};
    const limit = 20;
    if (query.name) {
        const name = query.name;
        const regex = new RegExp(name, "i");
        filter.name = regex;
    }
    if (query.category) {
        if (Array.isArray(query.category)) {
            filter.category = { $in: [...query.category] };
        }
        else {
            filter.category = { $in: [query.category] };
        }
    }
    if (query.from || query.to) {
        filter["price.USD"] = {};
        if (query.from) {
            filter["price.USD"]["$gte"] = +query.from || 0;
        }
        if (query.to) {
            filter["price.USD"]["$lte"] = +query.to || 10000;
        }
    }
    const totalCount = yield (yield (0, exports.DB)())
        .collection("games")
        .countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);
    const page = validPage(query.page, totalPages) || 1;
    const skip = (page - 1) * limit;
    const records = yield (yield (0, exports.DB)())
        .collection("games")
        .find(filter)
        .skip(skip)
        .limit(limit)
        .toArray();
    res.json({ games: records, totalPages });
}));
app.listen(PORT, () => {
    client.connect().then(() => {
        console.log("DB connected.");
    });
    console.log(`Server is running on port ${PORT}.`);
});
