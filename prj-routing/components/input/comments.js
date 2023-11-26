import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;
  const [comments, setComments] = useState([]);

  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (showComments) {
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
      };
      fetchData();
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    // send data to API
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
    const data = await response.json();
    console.log(data);
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
