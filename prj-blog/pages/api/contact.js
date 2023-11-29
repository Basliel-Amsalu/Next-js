import { connectDatabase, inserDocument } from "../../helpers/db-util";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid input" });
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({
        message: "server error",
      });
      return;
    }

    let result;
    try {
      result = await inserDocument(client, "messages", newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({
        message: "server error",
      });
      return;
    }
    client.close();

    res.status(201).json({
      message: "successfull sent message",
    });
  }
};

export default handler;
