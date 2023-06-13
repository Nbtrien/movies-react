import React from 'react';
import Slider from '../components/Slider';
import MovieSlider from '../components/MovieSlider';
import MovieChart from '../components/MovieChart';
import MovieBlock from '../components/MovieBlock';
import { movieCategory } from '../api/movieApi';

function Home() {
    return (
        <div className='home' id='page-content'>
            <MovieSlider />
            <MovieChart />
            <div>
                <MovieBlock type='genre' genre='chiếu rạp' />
                <MovieBlock type='category' category={movieCategory.feature_movie} />
                <MovieBlock type='category' category={movieCategory.series_movie} />
            </div>
        </div>
    );
}

export default Home;
