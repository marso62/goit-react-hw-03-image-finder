import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com";
const API_KEY = "18596349-2e2074799c5c536257b2bdca1";

const fetchImagesWithQuery = (searchQuery, page = 1) => {
  return axios
    .get(
      `/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then((response) => response.data.hits);
};

export default {
  fetchImagesWithQuery,
};
