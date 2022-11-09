import useGetQuery from "@/lib/hooks/useGetQuery";
import React from "react";

interface SickProps {
  sickCd: string;
  sickNm: string;
}

const Search = () => {
  const { query, setQuery, data } = useGetQuery<SickProps[]>();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  return (
    <div>
      <form>
        <input type="text" onChange={handleSearch} value={query} />
      </form>
      <span>
        {data?.map((value) => (
          <span key={value?.sickCd}>{value?.sickNm}</span>
        ))}
      </span>
    </div>
  );
};

export default Search;
