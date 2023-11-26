import fs from "fs";
import path from "path";
import { extractFeedback } from "../newsletter";

export function buildCommentPath() {
  return path.join(process.cwd(), "data", "comment.json");
}

const handler = (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;
    const name = req.body.name;
    const comment = req.body.comment;

    const newComment = {
      id: new Date().toISOString(),
      eventId: req.query.id,
      email,
      name,
      comment,
    };

    const filePath = buildCommentPath();
    const data = extractFeedback(filePath);
    data.push(newComment);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({
      newComment,
    });
  } else {
    const filePath = buildCommentPath();
    const data = extractFeedback(filePath);
    console.log(data);
    const comments = data.filter((comment) => comment.eventId === req.query.id);
    console.log(comments);
    res.status(200).json({
      comment: comments,
    });
  }
};

export default handler;
