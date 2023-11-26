import { buildFeedbackPath, extractFeedback } from "./feedback";

function handler(req, res) {
  const id = req.query.id;
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  const feedback = data.find((feedback) => feedback.id === id);

  res.status(200).json({
    feedback,
  });
}

export default handler;
