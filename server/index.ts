import express, { Express, Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import crypto from "crypto";
import dotenv from "dotenv";
import { Strategy } from "passport-steam";
import cors from "cors";
import jwt from "jsonwebtoken";
import * as mongoDB from "mongodb";
import { validUser, createUser } from "./db";
import { SteamUser } from "./ts/db_types";

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL || "";
const JWT_SECRET = process.env.JWT_SECRET || "";

const client = new mongoDB.MongoClient(MONGODB_URL);
const secretKey = crypto.randomBytes(32).toString("hex");
const app: Express = express();
app.use(cors());

export const DB = async () => {
  const db = await client.db("skin_games");
  return db;
};

app.use(
  session({
    secret: secretKey,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Strategy(
    {
      returnURL: "http://localhost:10000/auth/steam/return",
      realm: "http://localhost:10000/",
      apiKey: "3F0476DB842874F0D9F1481092C5C1C4",
    },
    (identifier: any, profile: any, done: (arg0: null, arg1: any) => void) => {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));

app.get("/auth/steam", passport.authenticate("steam"));

app.get(
  "/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/auth/steam" }),
  async (req: Request, res: Response) => {
    if (req.user) {
      const userSteam: SteamUser = req.user;
      let userFromDB = await validUser(userSteam);

      if (userFromDB == null) {
        userFromDB = await createUser(userSteam);
      }
      const token = jwt.sign({ ...userFromDB }, JWT_SECRET, {
        expiresIn: "6h",
      });
      res.redirect(`http://localhost:3000/?jwt=${token}}`);
    }
  }
);

app.get("/categories", async (req: Request, res: Response) => {
  const categories = await (await DB())
    .collection("games-categories")
    .find({})
    .toArray();
  res.json(categories);
});

app.get("/game/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const gameById = await (await DB())
      .collection("games")
      .findOne({ _id: new mongoDB.ObjectId(id) });
    res.json({ status: "Success", data: gameById });
  } catch (e) {
    res.json({ status: "Failed", message: "Error, try again later" });
  }
});

const validPage = (page: any, total: number) => {
  const pageNum = Number(page);
  if (!pageNum || pageNum == 0 || pageNum < 0) return 1;
  if (pageNum > total) return total;
};

app.get("/store", async (req, res) => {
  const query = req.query;
  const filter: any = {};
  const limit = 20;

  if (query.name) {
    const name: any = query.name;
    const regex = new RegExp(name, "i");
    filter.name = regex;
  }
  if (query.category) {
    if (Array.isArray(query.category)) {
      filter.category = { $in: [...query.category] };
    } else {
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

  const totalCount = await (await DB())
    .collection("games")
    .countDocuments(filter);

  const totalPages = Math.ceil(totalCount / limit);
  const page = validPage(query.page, totalPages) || 1;

  const skip = (page - 1) * limit;

  const records = await (await DB())
    .collection("games")
    .find(filter)
    .skip(skip)
    .limit(limit)
    .toArray();

  res.json({ games: records, totalPages });
});

app.listen(PORT, (): void => {
  client.connect().then(() => {
    console.log("DB connected.");
  });
  console.log(`Server is running on port ${PORT}.`);
});
