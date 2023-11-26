import { useEffect, useState } from "react";
import classes from "./comment-list.module.css";

function CommentList(props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadComments = async () => {
      const response = await fetch(`/api/comment/${props.id}`);
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
  }, [props.id]);

  return (
    <ul className={classes.comments}>
      {comments &&
        comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.comment}</p>
            <div>
              By <address>{comment.name}</address>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default CommentList;
