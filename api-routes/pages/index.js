import { useRef, useState } from "react";

function HomePage() {
  const emailInput = useRef();
  const feedbackInput = useRef();
  const [feedback, setFeedback] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = emailInput.current.value;
    const feedback = feedbackInput.current.value;

    const response = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        email,
        feedback,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  const loadFeedback = async () => {
    const response = await fetch("/api/feedback");
    const data = await response.json();
    console.log(data.feedback);
    setFeedback(data.feedback);
  };
  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='email'>Your email address</label>
          <input type='email' id='email' ref={emailInput} />
        </div>
        <div>
          <label htmlFor='feedback'>Your feedback</label>
          <textarea id='feedback' rows={"5"} ref={feedbackInput} />
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedback}>load feedback</button>
      <ul>
        {feedback.length !== 0 &&
          feedback.map((item) => <li key={item.id}>{item.text}</li>)}
      </ul>
    </div>
  );
}

export default HomePage;
