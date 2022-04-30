const APIkey = '56c7d00eb5bef25677cf9e4bb94032c2'


const request = {
    fetchTrending: `/trending/all/day?api_key=${APIkey}`,
    fetchPopularMovies: `/movie/popular?api_key=${APIkey}&page=1`,
    fetchTopratedMovies: `/movie/top_rated?api_key=${APIkey}&page=1`,
    fetchRatedShows: `/tv/top_rated?api_key=${APIkey}&page=1`,
    fetchPopularShows: `/tv/popular?api_key=${APIkey}&page=1`,
    fetchTvshowTrailer: `/tv/{tv_id}/similar?api_key=${APIkey}&page=1`,
    fetchUpcoming: `/movie/upcoming?api_key=${APIkey}&language=en-US&page=1`,
    fetchPopularMovieVn: `/movie/popular?api_key=${APIkey}&language=en-US&page=1&region=vn`,


  }
  
  export default request