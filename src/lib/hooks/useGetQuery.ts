import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api/api";

const instance = axios.create({
  baseURL: "http://localhost:4000"
});
const api = new API(instance);

const useGetQuery = <TData>() => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<TData>();

  const getData = async (query: string) => {
    const { data } = await api.fetch(`/sick?q=${query}`, query);
    setData(data);
  };

  useEffect(() => {
    if (query) {
      getData(query);
    }
  }, [query]);

  return { query, setQuery, data };
};

export default useGetQuery;
