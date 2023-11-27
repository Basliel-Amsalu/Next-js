import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;
  const ctx = useContext(NotificationContext);
  const [comments, setComments] = useState([]);

  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (showComments) {
      setLoading(true);
      const loadComments = async () => {
        const response = await fetch(`/api/comment/${eventId}`);
        const data = await response.json();
        console.log(data);
        return data;
      };

      const fetchData = async () => {
        const data = await loadComments();
        console.log(data);
        setComments(data.comment);
        setLoading(false);
      };
      fetchData();
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    ctx.showNotification({
      title: "Sending comment...",
      message: "your comment is currently being stored.",
      status: "pending",
    });
    try {
      const response = await fetch(`/api/comment/${eventId}`, {
        method: "POST",
        body: JSON.stringify({
          email: commentData.email,
          name: commentData.name,
          comment: commentData.text,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("something went wrong");
      const data = await response.json();
      ctx.showNotification({
        title: "Success",
        message: "Your comment was saved.",
        status: "success",
      });
      console.log(data);
    } catch (error) {
      ctx.showNotification({
        title: "Error!",
        message: error.message || "something went wrong",
        status: "error",
      });
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !loading && <CommentList comments={comments} />}
      {!showComments && loading && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
