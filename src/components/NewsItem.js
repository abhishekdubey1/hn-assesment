import { formatDistance } from "date-fns";
import PropTypes from "prop-types";
import useNewsItem from "../hooks/useNewsItem";
import Comments from "./Comments";
export default function NewsItem() {
  const {
    isIdle,
    isPending,
    isResolved,
    isRejected,
    error,
    data
  } = useNewsItem();
  const { id, author, url, points, created_at, title, children } = data || {};
  return (
    <>
      {isIdle && <center>No output! Try searching</center>}
      {isPending && <center>Loading your News...</center>}
      {isResolved && (
        <div className="list-item news-item" key={id}>
          <div className="news-item__main">
            <div className="list-item__head">
              <h3>{title || "No title"}</h3>
              {url && (
                <span>
                  {"("}
                  {new URL(url).hostname}
                  {")"}
                </span>
              )}
            </div>
            <div className="list-item__foot">
              <span>
                {points} by {author}{" "}
                {formatDistance(new Date(created_at), new Date(), {
                  addSuffix: true
                })}{" "}
                |
              </span>
              <span> hide | </span>
              <span> {children?.length} comments</span>
            </div>
          </div>
          {children && <Comments children={children} hideBtn={true} />}
        </div>
      )}
      {isRejected && (
        <center role="alert">
          <div>Oh no, there was a problem getting the news:</div>
          <pre>{error.message}</pre>
        </center>
      )}
    </>
  );
}
NewsItem.propTypes = {};
