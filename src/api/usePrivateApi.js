import useAxiosPrivate from './useAxiosPrivate';

const usePrivateApi = () => {
    const axiosPrivate = useAxiosPrivate();
    const privateApi = {
        checktoken: (params) => {
            const url = 'check_token';
            return axiosPrivate.post(url, params);
        },
        logout: (params) => {
            const url = 'logout';
            return axiosPrivate.post(url, params);
        },
        getUsers: (params) => {
            const url = 'users';
            return axiosPrivate.post(url, params);
        },
        createComment: (params) => {
            const url = 'comments';
            return axiosPrivate.post(url, params);
        },
        createUserMovie: (params) => {
            const url = 'usermovies';
            return axiosPrivate.post(url, params);
        },
        getMyMovies: (user_id, params) => {
            const url = 'user/' + user_id + '/movies';
            return axiosPrivate.get(url, params);
        },
        checkMovie: (user_id, movie_id, params) => {
            const url = 'user/' + user_id + '/movie/' + movie_id;
            return axiosPrivate.get(url, params);
        },
        addVote: (params) => {
            const url = 'rating';
            return axiosPrivate.post(url, params);
        },
        getUsers: (params) => {
            const url = 'users';
            return axiosPrivate.get(url, params);
        },
        createMovie: (params) => {
            const url = 'movies';

            return axiosPrivate.post(url, params);
        },
        createActor: (params) => {
            const url = 'actors';
            return axiosPrivate.post(url, params);
        },
        createGenres: (params) => {
            const url = 'genres';
            return axiosPrivate.post(url, params);
        },
        createTags: (params) => {
            const url = 'tags';
            return axiosPrivate.post(url, params);
        },
        createSeries: (params) => {
            const url = 'series';
            return axiosPrivate.post(url, params);
        },
        createEpisodes: (params) => {
            const url = 'episodes';
            return axiosPrivate.post(url, params);
        },
        addActors: (params) => {
            const url = 'actor-in-movies';
            return axiosPrivate.post(url, params);
        },

        //update
        updateTag: (id, params) => {
            const url = 'tag/' + id;
            return axiosPrivate.put(url, params);
        },
        updateGenres: (id, params) => {
            const url = 'genres/' + id;
            return axiosPrivate.put(url, params);
        },

        // delete
        deleteGenres: (params) => {
            const url = 'genres?' + params;
            return axiosPrivate.delete(url);
        },
        deleteTags: (params) => {
            const url = 'tags?' + params;
            return axiosPrivate.delete(url);
        },
    };

    return privateApi;
};

export default usePrivateApi;
