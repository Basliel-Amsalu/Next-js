import { useEffect, useRef, useState } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

const ContactForm = () => {
  const emailRef = useRef();
  const nameRef = useRef();
  const messageRef = useRef();
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === "error" || requestStatus === "success") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const sendContactData = async (data) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const response = await res.json();
    console.log(response);
    if (!res.ok) {
      console.log("here");
      throw new Error(response.message || "Something went wrong");
    }
  };

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const message = messageRef.current.value;

    const data = {
      email,
      name,
      message,
    };
    setRequestStatus("pending");
    try {
      await sendContactData(data);

      setRequestStatus("success");
      console.log(requestStatus);
    } catch (error) {
      console.log(requestStatus);
      setRequestError(error.message);
      setRequestStatus("error");
    }
  };

  let notification;

  if (requestStatus == "pending") {
    notification = {
      status: "pending",
      title: "sending message...",
      message: "your message id on its way!",
    };
  }
  if (requestStatus == "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "message sent successfully",
    };
  }
  if (requestStatus == "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }
  return (
    <section className={classes.contact}>
      <h1>How can i help you</h1>
      <form onSubmit={sendMessageHandler} className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email:</label>
            <input type='email' id='email' ref={emailRef} required />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name:</label>
            <input type='name' id='name' ref={nameRef} required />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea id='message' rows='5' ref={messageRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
