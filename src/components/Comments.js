import Comment from "./Comment";

export default function Comments(props) {
  return (
    <>
      <ol className="commments">
        {Array.isArray(props.children) &&
          props.children.map((comment, idx) => (
            <Comment comment={comment} key={comment.id} idx={idx} />
          ))}
      </ol>
    </>
  );
}
