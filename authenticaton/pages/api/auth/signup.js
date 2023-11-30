import { hashPassword } from "../../../helpers/auth";
import { connectDatabase, inserDocument } from "../../../helpers/db-util";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      !password.trim().length > 7
    ) {
      return res.status(422).json({
        message: "Invalid input",
      });
    }

    const client = await connectDatabase();
    const hashedPassword = await hashPassword(password);
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      client.close();
      return res.status(409).json({ message: "Email already in use" });
    }
    const result = await inserDocument(client, "users", {
      email,
      hashedPassword,
    });

    res.status(201).json({
      message: "created user",
    });
  }
};

export default handler;
