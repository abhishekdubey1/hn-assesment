import Comments from "./Comments";
import PropTypes from "prop-types";
import { useState } from "react";
import { formatDistance } from "date-fns";
export default function Comment({ comment, idx }) {
  const [visible, toggle] = useState(false);
  return (
    <li style={{ listStyle: "none", marginBottom: "10px" }}>
      <div className="comments-details">
        <span>{comment.author} </span>
        <span>
          {formatDistance(new Date(comment.created_at), new Date(), {
            addSuffix: true
          })}{" "}
          |{" "}
        </span>
        {comment.children?.length !== 0 && (
          <span
            role="button"
            style={{ userSelect: "none", cursor: "pointer" }}
            onClick={() => toggle((s) => !s)}
          >
            [ {visible ? "-" : "+"} ]
          </span>
        )}
      </div>
      <div style={{ display: "flex", color: "black" }}>
        <div style={{ marginRight: "10px" }}>{idx + 1}. </div>
        <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
      </div>
      {comment.children && visible && <Comments children={comment.children} />}
    </li>
  );
}

Comment.propTypes = {
  comment: PropTypes.object
};
