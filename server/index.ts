import express, { Express, Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import crypto from "crypto";
import { Strategy } from "passport-steam";
import cors from "cors";
import * as mongoDB from "mongodb";

const port: number = 10000;
const url = `mongodb+srv://admin:admin@cluster0.x9dzgnt.mongodb.net/skin_games?retryWrites=true&w=majority`;
const client = new mongoDB.MongoClient(url);
const secretKey = crypto.randomBytes(32).toString("hex");

const app: Express = express();
app.use(cors());

const DB = async () => {
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
  (req, res) => {
    res.redirect(`http://localhost:3000?user=${JSON.stringify(req.user)}`);
  }
);

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

app.listen(port, (): void => {
  client.connect().then(() => {
    console.log("DB connected.");
  });
  console.log(`Server is running on port ${port}.`);
});
