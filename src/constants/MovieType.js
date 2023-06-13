// export const ALL_MOVIE = 'Phim';
// export const POPULAR_MOVIE = 'view';
// export const NEW_MOVIE = 'realseadate';
// export const TOP_RATED = 'ratings';

// export const FEATUTE_MOVIE = 'phim-le';
// export const SERIES_MOVIE = 'phim-bo';

export const MOVIE_GENRE = 'genre';
export const MOVIE_CATEGORY = 'category';

export const MOVIE_CATEGORIES = {
    feature_movie: 'phim-le',
    series_movie: 'phim-bo',
};

export const MOVIE_GENRES = {
    action_movie: 'phim-hanh-dong',
    movie_in_theater: 'chieu-rap',
    anime: 'phim-anime',
    cartoon: 'phim-hoat-hinh',
    animated: 'hoat-hinh',
    action: 'hanh-dong',
    comedy: 'hai-huoc',
    romance: 'tinh-cam',
    fantasy: 'vien-tuong',
    war: 'chien-tranh',
    adventure: 'phieu-luu',
    thriller: 'hinh-su',
    horror: 'kinh-di',
    drama: 'tam-ly',
    kungfu: 'vo-thuat',
};

export const SIMILAR_TYPE = {
    similar_movie: 'Phim liên quan',
    same_series: 'Phim cùng series',
};

export const VIDEO_TYPE = {
    trailer: 'trailer',
    movie: 'movie',
    byType: {
        movie: '/movie',
    },
};

export function stringToSlug(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
    str = str.replaceAll(' ', '-');
    return str;
}
