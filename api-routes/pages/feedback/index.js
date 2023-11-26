import { useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

function FeedbackPage(props) {
  const [feedback, setFeedback] = useState();
  async function loadFeedbackHandler(id) {
    const response = await fetch(`/api/${id}`);
    const data = await response.json();
    setFeedback(data.feedback);
  }
  return (
    <>
      {feedback && <p>{feedback.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}{" "}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              show details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps(context) {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
