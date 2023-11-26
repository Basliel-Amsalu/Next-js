import {
  connectDatabase,
  getDocuments,
  inserDocument,
} from "../../../helpers/db-util";

const handler = async (req, res) => {
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({
      message: "connecting to the database failed",
    });

    return;
  }

  if (req.method === "POST") {
    const { email, name, comment } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !comment.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      client.close();
      return;
    }

    const newComment = {
      eventId: req.query.id,
      email,
      name,
      comment,
    };

    let result;
    try {
      result = await inserDocument(client, "comments", newComment);
      client.close();
    } catch (error) {
      res.status(500).json({
        message: "inserting data failed",
      });
      return;
    }

    newComment._id = result.insertedId;
    res.status(201).json({
      newComment,
    });
  } else {
    let comments;
    try {
      comments = await getDocuments(client, "comments", { _id: -1 });
      res.status(200).json({
        comment: comments,
      });
    } catch (error) {
      res.status(500).json({
        message: "loading data failed",
      });
    }
  }
  client.close();
};

export default handler;
