import axios from "axios";

export const fetchData = async (params: string) => {
  const data = await axios
    .get("http://localhost:10000" + params)
    .then((res) => res.data);
  return data;
};
