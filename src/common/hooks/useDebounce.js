import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set timeout
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, [delay]);
    //   Clear time out if value changes before time ends
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
export default useDebounce;
