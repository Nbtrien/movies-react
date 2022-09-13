import axiosClient from './axiosClient';

export const movieType = {
    popular_movie: 'view',
    new_movie: 'releasedate',
    top_rated: 'avgrating',
    similar_movie: 'similarmovies',
    same_series: 'sameseries',
};

export const movieCategory = {
    all_movie: '',
    feature_movie: 'phim lẻ',
    series_movie: 'phim bộ',
};

export const movieGenres = {
    action_movie: 'hành động',
    movie_in_theater: 'chiếu rạp',
    anime: 'anime',
    cartoon: 'hoạt hình',
};

const movieApi = {
    getMovies: (params) => {
        const url = 'movies';
        return axiosClient.get(url, params);
    },
    getMoviesbyActor: (id, params) => {
        const url = 'movies/actor/' + id;
        return axiosClient.get(url, params);
    },
    getDetail: (id) => {
        const url = 'movie' + '/' + id;
        return axiosClient.get(url);
    },
    getSimilarMovies: (id, similarType) => {
        const url = 'movies/' + similarType + '/' + id;
        return axiosClient.get(url);
    },
    getMoviesbyKey: (key, params) => {
        const url = 'movies/search/' + key;
        return axiosClient.get(url, params);
    },
    getTrailer: (id, params) => {
        const url = 'trailer/' + id;
        return axiosClient.get(url, params);
    },
    getVideobyId: (id, params) => {
        const url = 'video/' + id;
        return axiosClient.get(url, params);
    },
    getVideo: (id, videoType, params) => {
        const url = 'video' + videoType + '/' + id;
        return axiosClient.get(url, params);
    },
    getVideoId: (movie_id, episode, params) => {
        const url = 'video/movie/' + movie_id + '/' + episode;
        return axiosClient.get(url, params);
    },
    getComments: (id, params) => {
        const url = 'comments/' + id;
        return axiosClient.get(url, params);
    },
    getEpisodes: (id, params) => {
        const url = 'episodes/' + id;
        return axiosClient.get(url, params);
    },
    getActor: (id, params) => {
        const url = 'actor/' + id;
        return axiosClient.get(url, params);
    },
    login: (params) => {
        const url = 'login';
        return axiosClient.post(url, params);
    },
};

export default movieApi;
