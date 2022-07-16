import { useCallback, useState } from "react";

export default function useLruCache(capacity = 2) {
  const [cache, setCache] = useState(new Map());

  const has = useCallback(
    (key) => {
      return cache.has(key);
    },
    [cache]
  );

  const get = useCallback(
    (key) => {
      if (cache.has(key)) {
        const value = cache.get(key);
        const newCache = new Map(cache);
        newCache.delete(key);
        newCache.set(key, value);
        setCache(newCache);
        return value;
      }
      return -1;
    },
    [cache]
  );

  const push = useCallback(
    (key, value) => {
      const newCache = new Map(cache);
      newCache.delete(key);
      newCache.set(key, value);
      if (newCache.size > capacity) {
        newCache.delete(newCache.keys().next().value);
      }
      setCache(newCache);
    },
    [cache, capacity]
  );

  return { get, push, has };
}
