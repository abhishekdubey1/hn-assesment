import { useRef, useState } from "react";
import List from "./components/List";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import "./styles.css";
import NotFound from "./components/NotFound";
import NewsItem from "./components/NewsItem";
import { useList } from "./hooks";

export default function App() {
  const [input, setInput] = useState("");
  const state = useList(input);
  const listRef = useRef();

  const handleKeyDownInput = (e) => {
    if (!listRef.current) {
      return;
    }
    switch (e.keyCode) {
      case 38: {
        //up
        let list = listRef.current?.querySelectorAll("li");
        // eslint-disable-next-line
        list[list.length - 1]?.querySelector("a")?.focus();
        break;
      }
      case 40: {
        //down
        // eslint-disable-next-line
        listRef?.current
          ?.querySelectorAll("li")[0]
          ?.querySelector("a")
          ?.focus();
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="App">
      <Navbar
        input={input}
        onChange={(e) => setInput(e.target.value)}
        handleKeyDownInput={handleKeyDownInput}
      />
      <main className="main">
        <Routes>
          <Route path="/">
            <Route
              index
              element={<List input={input} ref={listRef} state={state} />}
            />
            <Route path=":newsId" element={<NewsItem />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}
