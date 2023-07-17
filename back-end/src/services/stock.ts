import axios from "axios"

const fetchStocks = async () => {
    const options = {
        method: "GET",
        url: process.env.API_URL + "any",
        headers: {
            "X-RapidAPI-Key": process.env.API_KEY,
            "X-RapidAPI-Host": process.env.API_HOST
        }
    }
    const response = await axios.request(options);
    console.log(Object.keys(response.data).length)
    return response.data;
}


export default { fetchStocks }