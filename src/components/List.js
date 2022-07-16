import { formatDistance } from "date-fns";
import { forwardRef } from "react";
import { useDebounce } from "../hooks";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const List = forwardRef(function ({ input, state }, listRef) {
  const {
    isIdle,
    isPending,
    isResolved,
    isRejected,
    error,
    fetchList,
    list
  } = state;

  useDebounce(fetchList, 300, [input]);

  const handleKeyDownListItem = (e) => {
    let parentNode = e.target.parentNode;
    switch (e.keyCode) {
      case 38: {
        const previousSibling = parentNode?.previousSibling;
        if (previousSibling) {
          // eslint-disable-next-line
          previousSibling?.querySelector("a")?.focus();
        } else {
          let list = listRef.current?.querySelectorAll("li");
          // eslint-disable-next-line
          list[list.length - 1]?.querySelector("a")?.focus();
        }
        break;
      }
      case 40: {
        const nextSibling = parentNode?.nextSibling;
        if (nextSibling) {
          // eslint-disable-next-line
          nextSibling?.querySelector("a")?.focus();
        } else {
          // eslint-disable-next-line
          listRef?.current
            ?.querySelectorAll("li")[0]
            ?.querySelector("a")
            ?.focus();
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      {isIdle && <center>No output! Try searching</center>}
      {isPending && <center>Loading your News...</center>}
      {isResolved && (
        <>
          <ol className="list" ref={listRef}>
            {Array.isArray(list) &&
              list.map((el) => (
                <li className="list-item" key={el.objectID}>
                  <Link
                    to={`/${el.objectID || ""}`}
                    name={`/${el.objectID || ""}`}
                    tabIndex="0"
                    onKeyDown={handleKeyDownListItem}
                  >
                    <div className="list-item__main">
                      <div className="list-item__head">
                        <h3>{el.title || "No title"}</h3>
                        {el.url && (
                          <span>
                            {"("}
                            {new URL(el.url).hostname}
                            {")"}
                          </span>
                        )}
                      </div>
                      <div className="list-item__foot">
                        <span>
                          {el.points} by {el.author}{" "}
                          {formatDistance(new Date(el.created_at), new Date(), {
                            addSuffix: true
                          })}{" "}
                          |
                        </span>
                        <span> hide | </span>
                        <span> {el.num_comments} comments</span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
          </ol>
          {list.length === 0 && <center>No results found</center>}
        </>
      )}
      {isRejected && (
        <center role="alert">
          <div>Oh no, there was a problem getting the news:</div>
          <pre>{error.message}</pre>
        </center>
      )}
    </>
  );
});
export default List;

List.propTypes = {
  input: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired
};
