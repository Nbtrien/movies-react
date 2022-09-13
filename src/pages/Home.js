import React from 'react';
import MovieSlider from '../components/MovieSlider';
import MovieChart from '../components/MovieChart';
import MovieBlock from '../components/MovieBlock';
import { movieCategory } from '../api/movieApi';

function Home() {
    document.title = 'AC Phim | Phim mới | Phim hay trọn bộ';
    return (
        <div className='home' id='page-content'>
            <MovieSlider />
            <MovieChart />
            <div>
                <MovieBlock genre='chiếu rạp' />
                <MovieBlock category={movieCategory.feature_movie} />
                <MovieBlock category={movieCategory.series_movie} />
            </div>
        </div>
    );
}

export default Home;
