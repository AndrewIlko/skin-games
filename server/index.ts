import express, { Express, Request, Response } from "express";
import cors from "cors";
import * as mongoDB from "mongodb";

const port: number = 10000;
const url = `mongodb+srv://admin:admin@cluster0.x9dzgnt.mongodb.net/skin_games?retryWrites=true&w=majority`;
const client = new mongoDB.MongoClient(url);

const DB = async () => {
  const db = await client.db("skin_games");
  return db;
};

const app: Express = express();
app.use(cors());

app.get("/game/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const gameById = await (await DB())
      .collection("games")
      .findOne({ _id: new mongoDB.ObjectId(id) });
    res.json({ status: "Success", data: gameById });
  } catch (e) {
    res.json({ status: "Failed", message: "Error, try again later" });
    throw new Error("Bad data format");
  }
});

app.listen(port, (): void => {
  client.connect().then(() => {
    console.log("DB connected.");
  });
  console.log(`Server is running on port ${port}.`);
});
