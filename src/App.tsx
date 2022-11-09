import axios from "axios";
import React, { useEffect, useState } from "react";

interface SickProps {
  sickCd: string;
  sickNm: string;
}

const App = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<SickProps[]>();

  const getData = async (query: string) => {
    const response = await axios.get(`http://localhost:4000/sick?q=${query}`);

    console.info("calling api");

    setData(response.data);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  useEffect(() => {
    if (search) {
      getData(search);
    }
  }, [search]);

  return (
    <div>
      <form>
        <input type="text" onChange={handleSearch} value={search} />
      </form>
      <span>
        {data?.map((value) => (
          <span key={value?.sickCd}>{value?.sickNm}</span>
        ))}
      </span>
    </div>
  );
};

export default App;
