import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=a06a4368974a509f3af750633bb5bfa5';
//Get Popular Movies
export const getPopularMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
  //console.log(JSON.stringify(resp.data, null, 2));
  return resp.data.results; //[0];
};

//Get Upcoming Movies
export const getUpcomingMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
  //console.log(JSON.stringify(resp.data, null, 2));
  return resp.data.results; //[0];
};

//Get Popular Tv
export const getPopularTv = async () => {
  const resp = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
  //console.log(JSON.stringify(resp.data, null, 2));
  return resp.data.results; //[0];
};
//Get Family Movie
export const getFamilyMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=10751`,
  );
  //console.log(JSON.stringify(resp.data, null, 2));
  return resp.data.results; //[0];
};

//Get Documentary Movies
export const getDocumentaryMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=99`,
  );
  //console.log(JSON.stringify(resp.data, null, 2));
  return resp.data.results; //[0];
};

export const getMovie = async id => {
  const resp = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`);
  return resp.data;
};

//Search for Movie or TV by Keyword
export const searchMovieTv = async (query, type) => {
  const resp = await axios.get(
    `${apiUrl}/search/${type}?${apiKey}&query=${query}`,
  );
  //console.log(JSON.stringify(resp.data, null, 2));
  return resp.data.results; //[0];
};
