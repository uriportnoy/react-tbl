import { useState, useEffect, useRef } from "react";

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const handler = useRef();

  useEffect(
    () => {
      handler.current = setTimeout(
        () => {
          setDebouncedValue(value);
        }, delay);

      return () => {
        //console.log("CLEAR");
        clearTimeout(handler.current);
      };
    },[value, delay]);
  
  return debouncedValue;
}