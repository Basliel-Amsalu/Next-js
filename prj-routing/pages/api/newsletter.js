import fs from "fs";
import path from "path";

export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);

  const data = JSON.parse(fileData);
  return data;
}

const handler = (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || !email.includes("@")) {
      res.status(422).json({
        message: "Invalid email address",
      });
      return;
    }

    const newfile = {
      id: new Date().toISOString(),
      email,
    };

    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    data.push(newfile);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({
      newfile,
    });
  }
};

export default handler;
