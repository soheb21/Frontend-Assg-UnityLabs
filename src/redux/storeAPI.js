import axios from "axios";

export const fetchData = async (searchData) => {
    try {
        const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${searchData}`);
        // console.log("res",response.data)
        return response.data.hits
    } catch (error) {
        console.log("fetching error", error)
    }
}
export const fetchDataDetail = async (param) => {
    try {
        const response = await axios.get(`https://hn.algolia.com/api/v1/items/${param.id}`);
        return response.data
    } catch (error) {
        console.log("fetching error", error)
    }
}
