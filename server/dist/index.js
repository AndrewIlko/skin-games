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
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const crypto_1 = __importDefault(require("crypto"));
const passport_steam_1 = require("passport-steam");
const cors_1 = __importDefault(require("cors"));
const mongoDB = __importStar(require("mongodb"));
const port = 10000;
const url = `mongodb+srv://admin:admin@cluster0.x9dzgnt.mongodb.net/skin_games?retryWrites=true&w=majority`;
const client = new mongoDB.MongoClient(url);
const secretKey = crypto_1.default.randomBytes(32).toString("hex");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const DB = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield client.db("skin_games");
    return db;
});
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
app.get("/auth/steam/return", passport_1.default.authenticate("steam", { failureRedirect: "/auth/steam" }), (req, res) => {
    res.redirect(`http://localhost:3000?user=${JSON.stringify(req.user)}`);
});
app.get("/game/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const gameById = yield (yield DB())
            .collection("games")
            .findOne({ _id: new mongoDB.ObjectId(id) });
        res.json({ status: "Success", data: gameById });
    }
    catch (e) {
        res.json({ status: "Failed", message: "Error, try again later" });
    }
}));
app.listen(port, () => {
    client.connect().then(() => {
        console.log("DB connected.");
    });
    console.log(`Server is running on port ${port}.`);
});
