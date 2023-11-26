import { connectDatabase, inserDocument } from "../../helpers/db-util";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || !email.includes("@")) {
      res.status(422).json({
        message: "Invalid email address",
      });
      return;
    }
    const newfile = {
      email,
    };
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({
        message: "connecting to the database failed",
      });
      return;
    }
    try {
      await inserDocument(client, "newsletter", newfile);
      client.close();
    } catch (error) {
      res.status(500).json({
        message: "inserting data failed",
      });
      return;
    }

    res.status(201).json({
      newfile,
    });
  }
};

export default handler;
