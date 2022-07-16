import { useEffect } from "react";

export default function (fn = () => {}, delay = 300, depList = []) {
  useEffect(() => {
    let timer = setTimeout(() => {
      fn();
    }, delay);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, ...depList]);
}
