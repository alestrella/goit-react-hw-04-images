import axios from 'axios';

const AUTH_KEY = '27580766-69a6c32a164d53413dc53c022';

axios.defaults.baseURL = 'https://pixabay.com/api/';

async function fetchImagesWithQuery(searchQuery, page) {
  const response = await axios.get(
    `/?q=${searchQuery}&key=${AUTH_KEY}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits;
}

const api = { fetchImagesWithQuery };
export default api;
