import { useContext, useRef } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const emailRef = useRef();
  const ctx = useContext(NotificationContext);
  async function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    const email = emailRef.current.value;
    ctx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending",
    });
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error(data.message || "something went wrong");
      const data = await response.json();
      ctx.showNotification({
        title: "Success",
        message: "successfully registered for newsletter.",
        status: "success",
      });
      console.log(data);
    } catch (error) {
      ctx.showNotification({
        title: "Error",
        message: error.message || "something went wrong",
        status: "danger",
      });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
