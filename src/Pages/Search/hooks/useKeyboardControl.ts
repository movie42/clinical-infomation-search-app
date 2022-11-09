import { useRef, useState } from "react";

const useKeyboardControl = () => {
  const [queryStringListlength, setQueryStringListlength] = useState(0);
  const ulRef = useRef<HTMLUListElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isKeySearch, setIsKeySearch] = useState(false);
  const [searchIndex, setSearchIndex] = useState<number>(-1);

  const handleKeyDown =
    (dataLength: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!e.currentTarget.value) {
        setIsKeySearch(false);
        return;
      }
      if (dataLength === 0) {
        return;
      }

      if (e.key === "ArrowUp") {
        setIsKeySearch(true);
        e.currentTarget.blur();
      }

      if (e.key === "ArrowDown") {
        setIsKeySearch(true);
        e.currentTarget.blur();
      }
    };

  const handleIncreseCount = (dataLength: number) => (pre: number) => {
    return (pre === -1 ? pre + dataLength : pre + 1) % dataLength;
  };

  const handleDecreseCount = (dataLength: number) => (pre: number) => {
    return ((pre < 0 ? 0 : pre - 1) + dataLength) % dataLength;
  };

  const handleEscape = (e: KeyboardEvent) => {
    if (!searchInputRef.current) {
      return;
    }

    if (e.key === "ArrowUp") {
      setSearchIndex(handleDecreseCount(queryStringListlength));
    }

    if (e.key === "ArrowDown") {
      setSearchIndex(handleIncreseCount(queryStringListlength));
    }

    if (e.key === "Escape") {
      searchInputRef.current?.focus();
      setSearchIndex(-1);
      setIsKeySearch(false);
    }
  };

  return {
    ulRef,
    searchInputRef,
    isKeySearch,
    setIsKeySearch,
    searchIndex,
    setSearchIndex,
    handleIncreseCount,
    handleDecreseCount,
    handleKeyDown,
    queryStringListlength,
    setQueryStringListlength,
    handleEscape
  };
};

export default useKeyboardControl;
