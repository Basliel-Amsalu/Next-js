import { useRef } from "react";

function HomePage() {
  const emailInput = useRef();
  const feedbackInput = useRef();

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
    const data = response.json();
    console.log(data);
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
    </div>
  );
}

export default HomePage;
