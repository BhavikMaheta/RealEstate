import axios from "axios";

 export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  const {data} = await axios.get(url, {
    headers: {
      "x-rapidapi-host": "bayut.p.rapidapi.com",
      "x-rapidapi-key": "e1135ef946mshd2d554fd876922dp1f0d11jsn2a34e55e9cce",
    },
  });


  

  return data;

};
